import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Layer,
  Tile,
  DataTableSkeleton,
} from '@carbon/react';
import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import { openmrsFetch, useConfig, restBaseUrl } from '@openmrs/esm-framework';
import styles from './home.component.scss';
import capitalize from 'lodash/capitalize';
import { EmptyDataIllustration } from '@openmrs/esm-patient-common-lib';
import ReportFilters from './ReportFilters';
import { useTranslation } from 'react-i18next';

const snakeCaseToCapitalizedWords = (snakeCaseString) =>
  snakeCaseString
    .split('_')
    .map((word) => capitalize(word))
    .join(' ');

const fetcher = (url) => openmrsFetch(url).then((res) => res.json());

const ReportComponent = () => {
  const config = useConfig();
  const { t } = useTranslation();
  const [reportId, setReportId] = useState('mother_hiv_status');
  const [ptrackerId, setPtrackerId] = useState('');
  const [personUuid, setPersonUuid] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [reportRequested, setReportRequested] = useState(false);

  const url = useMemo(() => {
    if (!startDate || !endDate) return null;
    return `${restBaseUrl}/mamba/report?report_id=${reportId}&ptracker_id=${ptrackerId}&person_uuid=${personUuid}&start_date=${startDate}&end_date=${endDate}`;
  }, [reportId, ptrackerId, personUuid, startDate, endDate]);

  const { data, error, mutate } = useSWR(url, fetcher, { revalidateOnFocus: false });

  const headers = useMemo(() => {
    if (!data || !data.results.length) return [];
    return data.results[0].record.map((column) => ({
      key: column.column,
      header: snakeCaseToCapitalizedWords(column.column),
    }));
  }, [data]);

  const rows = useMemo(() => {
    if (!data || !data.results.length) return [];
    return data.results.map((result) => ({
      id: result.serialId.toString(),
      ...result.record.reduce(
        (acc, column) => ({
          ...acc,
          [column.column]: column.value === null ? '-' : column.value,
        }),
        {},
      ),
    }));
  }, [data]);

  const loading = !data && !error && reportRequested;

  const handleFiltersToggle = () => setShowFilters(!showFilters);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReportRequested(true);
    mutate();
  };

  return (
    <div className={styles.homeContainer}>
      <OHRIWelcomeSection title={t('reportigDemo', 'Reporting demo')} />
      <ReportFilters
        config={config}
        reportId={reportId}
        setReportId={setReportId}
        ptrackerId={ptrackerId}
        setPtrackerId={setPtrackerId}
        personUuid={personUuid}
        setPersonUuid={setPersonUuid}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleSubmit={handleSubmit}
        showFilters={showFilters}
        handleFiltersToggle={handleFiltersToggle}
      />
      {loading ? (
        <DataTableSkeleton columnCount={headers.length} rowCount={rows.length} />
      ) : error ? (
        <div className={styles.dataTableContainer}>
          <Layer className={styles.layer}>
            <Tile className={styles.tile}>
              <p className={styles.content}>{t('errorLadigData', 'Error loading data')}</p>
              <p className={styles.explainer}>{t('pleaseTryAgain', 'Please try again later')}</p>
            </Tile>
          </Layer>
        </div>
      ) : rows.length === 0 || !reportRequested ? (
        <div className={styles.dataTableContainer}>
          <Layer className={styles.layer}>
            <Tile className={styles.tile}>
              <EmptyDataIllustration />
              <p className={styles.content}>{t('noDataToDisplay', 'No data to display')}</p>
              <p className={styles.explainer}>
                {t('useReportsAboveToBuild', 'Use the report filters above to build your reports')}
              </p>
            </Tile>
          </Layer>
        </div>
      ) : (
        <div className={styles.dataTableFullContainer}>
          <DataTable rows={rows} headers={headers}>
            {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })} key={header.key}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })} key={row.id}>
                      {headers.map((header) => (
                        <TableCell key={header.key}>{row[header.key] || '-'}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default ReportComponent;
