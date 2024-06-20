import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { age, attach, detach, ExtensionSlot, useConfig } from '@openmrs/esm-framework';
import { capitalize } from 'lodash-es';
import {
  basePath,
  finalHIVCodeConcept,
  finalPositiveHIVValueConcept,
} from '@ohri/openmrs-esm-ohri-commons-lib/src/constants';
import {
  fetchPatientsFromObservationCodeConcept,
  filterFHIRPatientsByName,
  getReportingCohort,
  TableEmptyState,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';

export const Vaccinations: React.FC<{}> = () => {
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
        header: t('vaccinationName', 'Name'),
        getValue: (patient) => {
          return `${patient.name[0].given.join(' ')} ${patient.name[0].family}`;
        },
        link: {
          getUrl: (patient) => `${basePath}${patient.id}/chart`,
        },
      },
      {
        key: 'gender',
        header: t('sex', 'Sex'),
        getValue: (patient) => {
          return capitalize(patient.gender);
        },
      },
      {
        key: 'Vaccinationage',
        header: t('Age', 'Age'),
        getValue: (patient) => {
          return age(patient.birthDate);
        },
      },
      {
        key: 'lastVaccineAdministered',
        header: t('vaccinationLastVaccineAdmin', 'Last Vaccine Administered'),
        getValue: (patient) => {
          return '--';
        },
      },
      {
        key: 'lastVaccineDoseAdministered',
        header: t('vaccinationLastVaccineDoseAdmin', 'Last Vaccine Dose Administered'),
        getValue: (patient) => {
          return '--';
        },
      },
    ],
    [t],
  );

  useEffect(() => {
    getReportingCohort(config.cohorts.covidVaccinatedClients).then((data) => {
      setCovidVaccinatedClients(data.members.length);
    });
    fetchPatientsFromObservationCodeConcept(finalHIVCodeConcept, finalPositiveHIVValueConcept, 14).then(
      (response: Array<any>) => {
        setPatients(response.map((pat) => pat.data));
        setTotalPatientCount(response.length);
        setIsLoading(false);
      },
    );
  }, [pageSize, currentPage, config.cohorts.covidVaccinatedClients]);

  useEffect(() => {
    attach('covid-vaccination-table-slot', 'patient-table');
    return () => {
      detach('covid-vaccination-table-slot', 'patient-table');
    };
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
        <ExtensionSlot name="covid-vaccination-table-slot" state={state} key={counter} />
      )}
    </div>
  );
};
function setCovidVaccinatedClients(length: any) {
  throw new Error('Function not implemented.');
}
