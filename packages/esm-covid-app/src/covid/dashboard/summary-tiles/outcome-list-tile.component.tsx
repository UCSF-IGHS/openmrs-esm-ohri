import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { age, attach, detach, ExtensionSlot, useConfig } from '@openmrs/esm-framework';
import { capitalize } from 'lodash-es';
import { fetchPatientCovidOutcome } from '../../../covid.resource';
import {
  getObsFromEncounter,
  filterFHIRPatientsByName,
  TableEmptyState,
  basePath,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';

export const Outcomes: React.FC<{}> = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatientCount, setTotalPatientCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState(null);
  const [counter, setCounter] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResultsCounts, setFilteredResultsCounts] = useState(0);
  const { t } = useTranslation();
  const config = useConfig();

  const columns = useMemo(
    () => [
      {
        key: 'name',
        header: t('name', 'Name'),
        getValue: (patient) => {
          return `${patient.name[0].given.join(' ')} ${patient.name[0].family}`;
        },
        link: {
          getUrl: (patient) => `${basePath}${patient.id}/chart`,
        },
      },
      {
        key: 'outcomegender',
        header: t('sex', 'Sex'),
        getValue: (patient) => {
          return capitalize(patient.gender);
        },
      },
      {
        key: 'outcomeage',
        header: t('age', 'Age'),
        getValue: (patient) => {
          return age(patient.birthDate);
        },
      },
      {
        key: 'outcomeAssessmentDate',
        header: t('AssessmentDate', 'AssessmentDate Date'),
        getValue: ({ latestEncounter }) => {
          return getObsFromEncounter(latestEncounter, config.obsConcepts.covidEncounterDateTime_UUID, true);
        },
      },
      {
        key: 'outcomePresentation',
        header: t('presentation', 'Presentation'),
        getValue: ({ latestEncounter }) => {
          return getObsFromEncounter(latestEncounter, config.obsConcepts.covidPresentSymptonsConcept_UUID);
        },
      },
      {
        key: 'outcome',
        header: t('outcome', 'Outcome'),
        getValue: ({ latestEncounter }) => {
          return getObsFromEncounter(latestEncounter, config.obsConcepts.covidOutcomeUUID);
        },
      },
      {
        key: 'outcomeDate',
        header: t('outcomeDate', 'Outcome Date'),
        getValue: ({ latestEncounter }) => {
          return getObsFromEncounter(latestEncounter, config.obsConcepts.covidOutcome);
        },
      },
    ],
    [
      config.obsConcepts.covidEncounterDateTime_UUID,
      config.obsConcepts.covidOutcome,
      config.obsConcepts.covidOutcomeUUID,
      config.obsConcepts.covidPresentSymptonsConcept_UUID,
      t,
    ],
  );

  useEffect(() => {
    fetchPatientCovidOutcome(config.cohorts.covidOutcomesCohortUUID).then((response: Array<any>) => {
      setPatients(response.map((pat) => pat.data));
      setTotalPatientCount(response.length);
      setIsLoading(false);
    });
  }, [pageSize, currentPage, config.cohorts.covidOutcomesCohortUUID]);

  useEffect(() => {
    attach('outcomes-table-slot', 'patient-table');
    return () => detach('outcomes-table-slot', 'patient-table');
  }, []);

  const pagination = useMemo(() => {
    return {
      usePagination: false,
      currentPage: currentPage,
      onChange: (props) => {
        setCurrentPage(props.page);
        setPageSize(props.pageSize);
      },
      pageSize: pageSize,
      totalItems: searchTerm ? filteredResultsCounts : totalPatientCount,
    };
  }, [currentPage, filteredResultsCounts, pageSize, totalPatientCount, searchTerm]);

  const handleSearch = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      if (searchTerm) {
        const filtrate = filterFHIRPatientsByName(searchTerm, patients);
        setFilteredResults(filtrate);
        setFilteredResultsCounts(filtrate.length);
      }
    },
    [patients],
  );

  const state = useMemo(
    () => ({
      patients: searchTerm ? filteredResults : patients,
      columns,
      search: {
        placeHolder: t('searchClientList', 'Search client list'),
        onSearch: handleSearch,
        currentSearchTerm: searchTerm,
      },
      pagination,
      isLoading,
      autoFocus: true,
    }),
    [searchTerm, filteredResults, patients, columns, t, handleSearch, pagination, isLoading],
  );

  useEffect(() => {
    setCounter(counter + 1);
  }, [counter, state]);

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      {!isLoading && !patients.length ? (
        <TableEmptyState tableHeaders={columns} message={t('noPatientList', 'There are no patients in this list.')} />
      ) : (
        <ExtensionSlot name="outcomes-table-slot" state={state} key={counter} />
      )}
    </div>
  );
};
