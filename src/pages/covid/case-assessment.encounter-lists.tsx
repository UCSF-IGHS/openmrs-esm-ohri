import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';
import styles from '../common.scss';
import { openmrsFetch } from '@openmrs/esm-framework';
import { getForm } from '../../utils/forms-loader';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { OHRIFormLauncherWithIntent } from '../../components/ohri-form-launcher/ohri-form-laucher.componet';
import moment from 'moment';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton';
import OTable from '../../components/data-table/o-table.component';

interface CovidOverviewListProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

const CovidAssessment: React.FC<CovidOverviewListProps> = ({ patientUuid }) => {
  const rowCount = 5;

  //TODO: Push this concepts constants to file

  //   const covidEncounterUUID = '902839fa-f58c-44a1-95a4-dba62d7263f8'; // Covid Case Report
  const covid_Assessment_EncounterUUID = '253a43d3-c99e-415c-8b78-ee7d4d3c1d54';
  const covidReasonsForTestingUUID = 'ae46f4b1-c15d-4bba-ab41-b9157b82b0ce'; // Reasons for testing
  const covidTestTypeUUID = '069f6dfe-88c1-4a45-a894-0d99549c8718'; // SARS2-Cov2 Test Type
  const covidTestResultUUID = '3f4ee14b-b4ab-4597-9fe9-406883b63d76'; // Diagnostic PCR Result
  const covidOutcomeUUID = 'a845f3e6-4432-4de4-9fff-37fa270b1a06';

  const covidTestDateUUID = '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Date specimen collected
  // const covidVaccinationStatusUUID = '40cb816f-797b-4cb4-a9fb-2727b2373623'; // Has the patient been vaccinated
  const covidPatientStatusUUID = 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f'; // Client Health Status

  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [covidCaseReportForm, setCovidCaseReportForm] = useState(getForm('covid', 'covid_assessment'));

  const launchHTSForm = (form?: any) => {};

  //TODO: Refactor to use new component
  const launchCaseReportForm = (form?: any) => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: covidCaseReportForm?.name,
      state: { updateParent: forceComponentUpdate, formJson: form || covidCaseReportForm },
    });
  };

  const forceComponentUpdate = () => setCounter(counter + 1);

  const tableHeaders = [
    { key: 'encounterDate', header: 'Encounter Date', isSortable: true },
    { key: 'reasonsForTesting', header: 'Reason for testing' },
    { key: 'testDate', header: 'Test Date' },
    { key: 'lastTestResult', header: ' Test Result' },
    { key: 'outcome', header: 'Outcome' },
  ];

  function getCovidEncounters(query: string, customRepresentation: string) {
    return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`).then(({ data }) => {
      let rows = [];

      const sortedEncounters = data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );

      sortedEncounters.map(encounter => {
        const covidTestType = encounter.obs.find(observation => observation.concept.name.uuid === covidTestTypeUUID);
        const lastCovidTestDate = encounter.obs.find(
          observation => observation.concept.name.uuid === covidTestDateUUID,
        );
        const lastCovidTestResult = encounter.obs.find(
          observation => observation.concept.name.uuid === covidTestResultUUID,
        );
        const covidReasonsForTesting = encounter.obs.find(
          observation => observation.concept.name.uuid === covidReasonsForTestingUUID,
        );
        const covidOutcome = encounter.obs.find(observation => observation.concept.name.uuid === covidOutcomeUUID);

        const covidPatientStatus = encounter.obs.find(
          observation => observation.concept.name.uuid === covidPatientStatusUUID,
        );

        rows.push({
          id: encounter.uuid,
          encounterDate: moment(encounter.encounterDatetime).format('DD-MMM-YYYY'),
          reasonsForTesting: covidReasonsForTesting?.value?.name?.name || 'None',
          testDate: lastCovidTestDate ? moment(lastCovidTestDate).format('DD-MMM-YYYY') : 'None',
          lastTestResult: lastCovidTestResult?.value?.name?.name || 'None',
          outcome: covidOutcome?.value?.name?.name || 'None',
          patientStatus: covidPatientStatus?.value?.name?.name || 'None',
        });
      });
      setTableRows(rows);
      setIsLoading(false);
    });
  }
  useEffect(() => {
    let query = `encounterType=${covid_Assessment_EncounterUUID}&patient=${patientUuid}`;
    getCovidEncounters(query, covidEncounterRepresentation);
  }, [counter]);

  const headerTitle = t('covidCaseReports', 'Covid Assessment');
  const displayText = t('covidCaseReports', 'Covid Assessment');
  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
              <OHRIFormLauncherWithIntent
                formJson={covidCaseReportForm}
                launchForm={launchCaseReportForm}
                onChangeIntent={setCovidCaseReportForm}
              />
            </div>
            <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
          </div>
        </>
      ) : (
        <EmptyState
          displayText={displayText}
          headerTitle={headerTitle}
          launchFormComponent={
            <OHRIFormLauncherWithIntent
              formJson={covidCaseReportForm}
              launchForm={launchCaseReportForm}
              onChangeIntent={setCovidCaseReportForm}
            />
          }
        />
      )}
    </>
  );
};

export default CovidAssessment;
