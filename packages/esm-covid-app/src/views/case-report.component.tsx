import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../covid.scss';
import { openmrsFetch } from '@openmrs/esm-framework';
import DataTableSkeleton from '@carbon/react';
import moment from 'moment';
import { getForm } from '@openmrs/openmrs-form-engine-lib';
import { EmptyState, OHRIFormLauncherWithIntent, OTable } from '@ohri/openmrs-esm-ohri-commons-lib';
import { launchOHRIWorkSpace } from '@ohri/openmrs-esm-ohri-commons-lib/src/workspace/ohri-workspace-utils';
import { moduleName } from '../index';

interface CovidOverviewListProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

const CovidCaseReport: React.FC<CovidOverviewListProps> = ({ patientUuid }) => {
  const rowCount = 5;
  const covidEncounterUUID = '902839fa-f58c-44a1-95a4-dba62d7263f8'; // Covid Case Report
  const covidTestTypeUUID = '069f6dfe-88c1-4a45-a894-0d99549c8718'; // SARS2-Cov2 Test Type
  const covidTestDateUUID = '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Date specimen collected
  const covidTestResultUUID = '3f4ee14b-b4ab-4597-9fe9-406883b63d76'; // Diagnostic PCR Result
  const covidReasonsForTestingUUID = 'ae46f4b1-c15d-4bba-ab41-b9157b82b0ce'; // Reasons for testing
  const covidVaccinationStatusUUID = '40cb816f-797b-4cb4-a9fb-2727b2373623'; // Has the patient been vaccinated
  const covidPatientStatusUUID = 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f'; // Client Health Status

  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [covidCaseReportForm, setCovidCaseReportForm] = useState(getForm('covid', 'covid_case'));

  const launchHTSForm = (form?: any) => {};

  //TODO: Obtain clarity on best approach to launch form
  const launchCaseReportForm = (form?: any) => {
    launchOHRIWorkSpace({
      title: covidCaseReportForm?.name,
      moduleName,
      state: { updateParent: forceComponentUpdate, formJson: form || covidCaseReportForm },
    });
  };

  const forceComponentUpdate = () => setCounter(counter + 1);

  const tableHeaders = [
    { key: 'encounterDate', header: t('encounterDate', 'Encounter Date'), isSortable: true },
    { key: 'cov2TestType', header: t('sarsCovidTestType', 'SARS-Cov2 test type') },
    { key: 'lastTestDate', header: t('dateOfLastTest', 'Date of last test') },
    { key: 'lastTestResult', header: t('result', 'Result') },
    { key: 'reasonsForTesting', header: t('reasonsForTesting', 'Reasons for testing') },
    { key: 'vaccinationStatus', header: t('vaccinationStatus', 'Vaccination Status') },
    { key: 'patientStatus', header: t('patientStatus', 'Patient status') },
  ];

  function getCovidEncounters(query: string, customRepresentation: string) {
    return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`).then(({ data }) => {
      let rows = [];

      const sortedEncounters = data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );

      sortedEncounters.map((encounter) => {
        const covidTestType = encounter.obs.find((observation) => observation.concept.name.uuid === covidTestTypeUUID);
        const lastCovidTestDate = encounter.obs.find(
          (observation) => observation.concept.name.uuid === covidTestDateUUID,
        );
        const lastCovidTestResult = encounter.obs.find(
          (observation) => observation.concept.name.uuid === covidTestResultUUID,
        );
        const covidReasonsForTesting = encounter.obs.find(
          (observation) => observation.concept.name.uuid === covidReasonsForTestingUUID,
        );
        const covidVaccinationStatus = encounter.obs.find(
          (observation) => observation.concept.name.uuid === covidVaccinationStatusUUID,
        );
        const covidPatientStatus = encounter.obs.find(
          (observation) => observation.concept.name.uuid === covidPatientStatusUUID,
        );

        rows.push({
          id: encounter.uuid,
          encounterDate: moment(encounter.encounterDatetime).format('DD-MMM-YYYY'),
          cov2TestType: covidTestType?.value?.name?.name || 'None',
          lastTestDate: lastCovidTestDate ? moment(lastCovidTestDate).format('DD-MMM-YYYY') : 'None',
          lastTestResult: lastCovidTestResult?.value?.name?.name || 'None',
          reasonsForTesting: covidReasonsForTesting?.value?.name?.name || 'None',
          vaccinationStatus: covidVaccinationStatus?.value?.name?.name || 'None',
          patientStatus: covidPatientStatus?.value?.name?.name || 'None',
        });
      });
      setTableRows(rows);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    let query = `encounterType=${covidEncounterUUID}&patient=${patientUuid}`;
    getCovidEncounters(query, covidEncounterRepresentation);
  }, [counter]);

  const headerTitle = t('covidLabResults', 'Lab Results');
  const displayText = t('covidLabResults', 'Lab Results');

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
              <OHRIFormLauncherWithIntent formJson={covidCaseReportForm} launchForm={launchCaseReportForm} />
            </div>
            <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={displayText}
          headerTitle={headerTitle}
          launchFormComponent={
            <OHRIFormLauncherWithIntent formJson={covidCaseReportForm} launchForm={launchCaseReportForm} />
          }
        />
      )}
    </>
  );
};

export default CovidCaseReport;
