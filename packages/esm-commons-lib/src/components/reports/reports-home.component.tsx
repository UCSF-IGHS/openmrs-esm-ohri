import React, { useState, useMemo, useEffect } from 'react';
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
import ReportFilters from './reportfilters';
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
  const [reportId, setReportId] = useState('');
  const [uuid, setUuid] = useState('');
  const [ptrackerId, setPtrackerId] = useState('');
  const [personUuid, setPersonUuid] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportRequested, setReportRequested] = useState(false);

  const url = useMemo(() => {
    if (!startDate || !endDate || !reportId) return null;
    return `${restBaseUrl}/reportingrest/reportdata/${reportId}?startDate=${startDate}&endDate=${endDate}`;
  }, [reportId, startDate, endDate]);

  const { data, error, mutate } = useSWR(url, fetcher, { revalidateOnFocus: false });

  useEffect(() => {
    if (error) {
      console.error('Error fetching report data:', error);
    }
  }, [error]);

  const headers = useMemo(() => {
    if (!data || !data.dataSets || !data.dataSets.length || !data.dataSets[0].metadata) return [];
    return data.dataSets[0].metadata.columns.map((column) => ({
      key: column.name,
      header: column.label,
    }));
  }, [data]);

  const rows = useMemo(() => {
    if (!data || !data.dataSets || !data.dataSets.length || !data.dataSets[0].rows) return [];
    return data.dataSets[0].rows.map((result, idx) => ({
      id: idx.toString(),
      ...result,
    }));
  }, [data]);

  const loading = !data && !error && reportRequested;

  const handleSubmit = (e) => {
    e.preventDefault();
    setReportRequested(true);
    mutate();
  };

  return (
    <div className={styles.homeContainer}>
      <OHRIWelcomeSection title={t('reportingDemo', 'Reporting demo')} />
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
        setReportRequested={setReportRequested}
        uuid={uuid}
      />
      {loading ? (
        <DataTableSkeleton columnCount={headers.length} rowCount={rows.length} />
      ) : error ? (
        <div className={styles.dataTableContainer}>
          <Layer className={styles.layer}>
            <Tile className={styles.tile}>
              <p className={styles.content}>{t('errorLoadingData', 'Error loading data')}</p>
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
