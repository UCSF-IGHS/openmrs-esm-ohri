/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styles from './patient-list.scss';
import { useTranslation } from 'react-i18next';
import { EmptyState, encounterRepresentation, fetchLastVisit, fetchPatientList, getObsFromEncounter, OTable } from 'openmrs-esm-ohri-commons-lib';
import { age, navigate, openmrsFetch } from '@openmrs/esm-framework';
import { Cd4LabResultCountPercentage_UUID, Cd4LabResultDate_UUID, CD4LabResultsEncounter_UUID } from '../../../../../constants';
import { DataTableSkeleton, Pagination } from 'carbon-components-react';
import { capitalize } from 'lodash';

interface CD4ResultsListProps {
  patientUuid: string;
}

const CD4ResultsList: React.FC<CD4ResultsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [patients, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatientCount, setPatientCount] = useState(0);
  const [nextOffSet, setNextOffSet] = useState(0);
  const headerTitle = 'CD4 Results';
  const tableHeaders = [
    { key: 'name', header: 'Patient Name', isSortable: true },
    { key: 'age', header: 'Age' },
    { key: 'gender', header: 'Sex' },
    { key: 'cd4Result', header: 'Most Recent CD4 Results' },
    { key: 'cd4ResultDate', header: 'CD4 Results Date' },
    { key: 'actions', header: '' },
  ];

  useEffect(() => {
    if (!page) setIsLoading(true);
    loadPatients(nextOffSet, pageSize);
  }, [page, pageSize]);

  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });

  async function loadPatients(offSet: number, pageSize: number) {
    let rows = [];
    const { data: patients } = await fetchPatientList(offSet, pageSize);

    setPatientCount(patients.total);
    let lastCd4Result: string;
    let lastCd4ResultDate: any;
    for (let patient of patients.entry) {
        const { data } = await fetchLastVisit(patient.resource.id);
        let patientIdArray: string[] = [patient.resource.id];
        const patientViralLoadPromises = patientIdArray.map(patientId => {
        const query = `encounterType=${CD4LabResultsEncounter_UUID}&patient=${patientId}`;
        return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`);
      });
      Promise.all(patientViralLoadPromises).then(values => {
        values.forEach(({ data }, index) => {
          if (data.results?.length > 0) {
            const sortedEncounters = data.results.sort(
              (firstEncounter, secondEncounter) =>
                new Date(secondEncounter.encounterDatetime).getTime() -
                new Date(firstEncounter.encounterDatetime).getTime(),
            );
            const lastEncounter = sortedEncounters[0];
            lastCd4Result = getObsFromEncounter(lastEncounter, Cd4LabResultCountPercentage_UUID);
            lastCd4ResultDate = getObsFromEncounter(lastEncounter, Cd4LabResultDate_UUID, true);
            console.log(`CD4: ${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}.. ${lastCd4Result}`);
          }
        });
      });

      rows.push({
        id: patient.resource.id,
        name: `${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`,
        age: age(patient.resource.birthDate),
        gender: capitalize(patient.resource.gender),
        cd4Result: lastCd4Result ? lastCd4Result : '__',
        cd4ResultDate: lastCd4ResultDate ? lastCd4ResultDate : '__',
      });
    }
    setTableRows(rows);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : patients.length > 0 ? (
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeaderContainer}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
          </div>
          <OTable tableHeaders={tableHeaders} tableRows={patients} />
          <div style={{ width: '800px' }}>
            <Pagination
              page={page}
              pageSize={pageSize}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={totalPatientCount}
              onChange={({ page, pageSize }) => {
                setNextOffSet(page * pageSize + 1);
                setPage(page);
                setPageSize(pageSize);
              }}
            />
          </div>
        </div>
      ) : (
        <EmptyState
          displayText={t('patientList', 'patient list')}
          headerTitle={headerTitle}
          launchForm={addNewPatient}
        />
      )}
    </>
  );
};

export default CD4ResultsList;
