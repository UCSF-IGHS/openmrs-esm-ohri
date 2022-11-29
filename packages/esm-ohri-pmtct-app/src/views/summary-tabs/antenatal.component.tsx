import React, { useEffect, useState, useCallback } from 'react';
import styles from '../summary-tabs/ohri-patient-tabs.scss';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon, fetchPatientList, OTable } from '@ohri/openmrs-esm-ohri-commons-lib';
import { DataTableSkeleton, Pagination, Search } from '@carbon/react';

interface AntentalListProps {
  patientUuid: string;
}

export const filterPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter((patient) => patient.patientSearchName.toLowerCase().includes(searchTerm.toLowerCase()));
};

const AntentalList: React.FC<AntentalListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPatientCount, setPatientCount] = useState(0);
  const [nextOffSet, setNextOffSet] = useState(0);
  const headerTitle = '';

  const tableHeaders = [
    { key: 'name', header: t('patientName', 'Patient Name'), isSortable: true },
    { key: 'gender', header: t('sex', 'Sex') },
    { key: 'age', header: t('age', 'Age') },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetchPatientList(nextOffSet, pageSize).then(({ data }) => {
      setPatients(data.entry);
      setPatientCount(data.total);
      setIsLoading(false);
    });
  }, [page, pageSize]);

  const handleSearch = useCallback(
    (searchTerm) => {
      setSearchTerm(searchTerm);
      const filtrate = filterPatientsByName(searchTerm, allRows);
      setFilteredResults(filtrate);
      return true;
    },
    [searchTerm],
  );

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : allRows.length > 0 ? (
        <>
          <div className={styles.searchBox}>
            <Search
              className={styles.searchField}
              labelText="Search"
              placeHolderText="Search Client list"
              size="sm"
              light
              onKeyDown={({ target }) => handleSearch(target['value'])}
            />
          </div>
          <div className={styles.widgetContainer}>
            <OTable tableHeaders={tableHeaders} tableRows={searchTerm ? filteredResults : allRows} />
            <div style={{ width: '800px' }}>
              <Pagination
                page={page}
                pageSize={pageSize}
                pageSizes={[10, 20, 30, 40, 50]}
                totalItems={totalPatientCount}
                onChange={({ page, pageSize }) => {
                  setSearchTerm(null);
                  setPage(page);
                  setNextOffSet((page - 1) * pageSize);
                  setPageSize(pageSize);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <EmptyStateComingSoon displayText={t('antenatal', 'Antenatal')} headerTitle={headerTitle} />
      )}
    </>
  );
};

export default AntentalList;
