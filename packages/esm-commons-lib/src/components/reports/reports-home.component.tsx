import React, { useState, useMemo } from 'react';
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
import { useConfig } from '@openmrs/esm-framework';
import styles from './home.component.scss';
import { EmptyDataIllustration } from '@openmrs/esm-patient-common-lib';
import ReportFilters from './report-filters.component';
import { useTranslation } from 'react-i18next';
import { useReportsData } from './reports.resource';
import { BorderBottom } from '@carbon/react/icons';

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
  const { data, error, mutate } = useReportsData(startDate, endDate, reportId);

  const headers = useMemo(() => {
    if (
      !data ||
      !data.dataSets ||
      !data.dataSets.length ||
      !data.dataSets[0].metadata ||
      !data.dataSets[0].metadata.columns
    )
      return [];
    return data.dataSets[0].metadata.columns.map((col) => ({
      key: col.name.trim(), // Ensure key is a string and trimmed
      header: col.label,
    }));
  }, [data]);

  const rows = useMemo(() => {
    if (
      !data ||
      !data.dataSets ||
      !data.dataSets.length ||
      !data.dataSets[0].rows ||
      !data.dataSets[0].metadata ||
      !data.dataSets[0].metadata.columns
    )
      return [];
    return data.dataSets[0].rows.map((row, idx) => {
      const rowData = {};
      data.dataSets[0].metadata.columns.forEach((col) => {
        const key = col.name.trim(); // Ensure key is a string and trimmed
        rowData[key] = row[key] !== undefined ? row[key] : '-';
      });
      return { id: idx.toString(), ...rowData };
    });
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
      ) : rows?.length === 0 || (!reportRequested && data.dataSets[0].metadata?.columns.length > 0) ? (
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
          {/* <DataTable rows={rows} headers={headers}>
            {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
              <Table {...getTableProps()} className={styles.dataTable}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })} key={header.key} className={styles.tableHeader}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id} className={styles.tableCell}>
                          {cell.value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable> */}

          {data && data?.dataSets && data?.dataSets?.length > 0 && (
            <Layer>
              <div className={styles.tableGridLayout}>
                {Array.from(data.dataSets[0].metadata?.columns, (col: any) => {
                  return {
                    label: col.label,
                    value: data.dataSets[0].rows[0][col.name] ?? '-',
                  };
                }).map((r) => (
                  <div className={styles.dataCell}>
                    <p className={styles.dataCellHeader}>{r.label}</p>
                    <p className={styles.dataCellValue}>
                      <strong>{r.value}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </Layer>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportComponent;
