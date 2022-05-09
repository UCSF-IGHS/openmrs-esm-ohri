/* eslint-disable */
import React, { useEffect, useState, useMemo } from 'react';

import styles from './patient-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { age, navigate, openmrsFetch } from '@openmrs/esm-framework';
import { DataTableSkeleton, Link, Pagination, OverflowMenu } from 'carbon-components-react';
import { capitalize, values } from 'lodash';
import moment from 'moment';
import {
  AddPatientToListOverflowMenuItem,
  EmptyState,
  OTable,
  fetchLastVisit,
  fetchPatientList,
  encounterRepresentation,
  findObs,
  getObsFromEncounter,
} from 'openmrs-esm-ohri-commons-lib';
import { ViralLoadResultDate_UUID, ViralLoadResultsEncounter_UUID, ViralLoadResult_UUID } from '../../../../../constants';

interface ViralLoadResultsListProps {
  patientUuid: string;
}
interface ViralLoadValues {
    LastViralLoadResult: string;
    LastViralLoadResultDate: string;

}

const ViralLoadResultsList: React.FC<ViralLoadResultsListProps> = () => {
  const { t } = useTranslation();
  const [patients, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatientCount, setPatientCount] = useState(0);
  const [nextOffSet, setNextOffSet] = useState(0);
  const headerTitle = 'Viral Load Results';
  const tableHeaders = [
    { key: 'name', header: 'Patient Name', isSortable: true },
    { key: 'age', header: 'Age' },
    { key: 'gender', header: 'Sex' },
    { key: 'viralLoadResult', header: 'Most Recent Viral Load Results' },
    { key: 'viralLoadResultDate', header: 'Viral Load Results Date' },
    { key: 'actions', header: '' },
  ];

  useEffect(() => {
    if (!page) setIsLoading(true);
    loadPatients(nextOffSet, pageSize);
  }, [page, pageSize]);

  const fetchPatientLastViralEncounterValues = (patientUuid: string) => {
    const query = `encounterType=${ViralLoadResultsEncounter_UUID}&patient=${patientUuid}`;
    openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
        if(data.results?.length > 0){
            Promise.all(data).then(values => console.log({values}))
            let sortedEncounters = data.results.sort(
                (firstEncounter, secondEncounter) => 
                new Date(secondEncounter.encounterDatetime).getTime() -
                new Date(firstEncounter.encounterDatetime).getTime()
            );
            let lastEncounter = sortedEncounters[0];
            const result = getObsFromEncounter(lastEncounter, ViralLoadResult_UUID);             
            const date = getObsFromEncounter(lastEncounter, ViralLoadResultDate_UUID,true);
            const results = {result: result, date: date}
            console.log(results);

            return results;
        }
    });
    return {};
  }
  
  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });
  const navigateToPatientDB = patientUuid =>
    navigate({ to: '${openmrsSpaBase}/patient/' + `${patientUuid}/chart/hts-summary` });
  async function loadPatients(offSet: number, pageSize: number) {
    let rows = [];
    const { data: patients } = await fetchPatientList(offSet, pageSize);

    setPatientCount(patients.total);
    let lastViralLoadResult: string;
    let lastViralLoadResultDate: any;
    for (let patient of patients.entry) {
      const { data } = await fetchLastVisit(patient.resource.id);
      const lastVisit = data?.entry?.length ? data?.entry[0]?.resource?.period?.start : '';
      let patientIdArray: string[] = [patient.resource.id];
      const patientViralLoadPromises = patientIdArray.map(patientId => {
        const query = `encounterType=${ViralLoadResultsEncounter_UUID}&patient=${patientId}`;
        return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`);
      });
      Promise.all(patientViralLoadPromises).then(values => {
          values.forEach(({data}) => {
              if(data.results?.length > 0){
                const sortedEncounters = data.results.sort(
                    (firstEncounter, secondEncounter) =>
                      new Date(secondEncounter.encounterDatetime).getTime() -
                      new Date(firstEncounter.encounterDatetime).getTime(),
                  );
                const lastEncounter = sortedEncounters[0];
                lastViralLoadResult = getObsFromEncounter(lastEncounter, ViralLoadResult_UUID);             
                lastViralLoadResultDate = getObsFromEncounter(lastEncounter, ViralLoadResultDate_UUID,true);
              }
          });
      });

    //   const query = `encounterType=${ViralLoadResultsEncounter_UUID}&patient=${patient.resource.id}`;
    //   openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
    //       if(data.results?.length > 0){
    //           Promise.all(data).then(values => console.log({values}))
    //           let sortedEncounters = data.results.sort(
    //               (firstEncounter, secondEncounter) => 
    //               new Date(secondEncounter.encounterDatetime).getTime() -
    //               new Date(firstEncounter.encounterDatetime).getTime()
    //           );
    //           let lastEncounter = sortedEncounters[0];
    //           LastViralLoadResult = getObsFromEncounter(lastEncounter, ViralLoadResult_UUID);             
    //           LastViralLoadResultDate = getObsFromEncounter(lastEncounter, ViralLoadResultDate_UUID,true);
    //       }
    //   });

      const patientActions = (
        <OverflowMenu flipped>
          <AddPatientToListOverflowMenuItem patientUuid={patient.resource.id} excludeCohorts={[]} />
        </OverflowMenu>
      );

      rows.push({
        id: patient.resource.id,
        name: (
          <Link
            onClick={e => {
              e.preventDefault();
              navigateToPatientDB(patient.resource.id);
            }}>
            {`${patient.resource.name[0].given.join(' ')} ${patient.resource.name[0].family}`}
          </Link>
        ),
        age: age(patient.resource.birthDate),
        gender: capitalize(patient.resource.gender),
        viralLoadResult: lastViralLoadResult ? lastViralLoadResult : '__',
        viralLoadResultDate: lastViralLoadResultDate ? lastViralLoadResultDate : '__',
        actions: patientActions,
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
            <div className={styles.toggleButtons}>
              <Button
                kind="ghost"
                renderIcon={Add16}
                iconDescription="New"
                onClick={e => {
                  e.preventDefault();
                  addNewPatient();
                }}>
                {t('add', 'Add')}
              </Button>
            </div>
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

export default ViralLoadResultsList;
