import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
import { useConfig } from '@openmrs/esm-framework';
import { EmptyDataIllustration } from '@openmrs/esm-patient-common-lib';
import ReportFilters from './report-filters.component';
import { useTranslation } from 'react-i18next';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import styles from './home.component.scss';
import { fetchReportData, constructReportUrl, snakeCaseToCapitalizedWords } from './reports.resource';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportComponent = () => {
  const config = useConfig();
  const { t } = useTranslation();

  const [reportId, setReportId] = useState('');
  const [parameterValues, setParameterValues] = useState({});
  const [reportRequested, setReportRequested] = useState(false);
  const [reportName, setReportName] = useState('Report Data');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);

  const url = useMemo(() => {
    if (!reportId) return null;
    return constructReportUrl(reportId, parameterValues);
  }, [reportId, parameterValues]);

  const { data, error, mutate } = useSWR(url, fetchReportData, { revalidateOnFocus: false });

  useEffect(() => {
    if (error) {
      console.error('Error fetching report data:', error);
    }
  }, [error]);

  useEffect(() => {
    if (data?.results?.length) {
      const columns = data.results[0].record.map((item) => ({
        key: item.column,
        label: snakeCaseToCapitalizedWords(item.column),
      }));
      setAvailableColumns(columns);
      setSelectedColumns(columns);
    }
  }, [data]);

  const headers = useMemo(() => {
    if (!selectedColumns.length) return [];
    return selectedColumns.map((col) => ({
      key: col.key,
      header: col.label,
    }));
  }, [selectedColumns]);

  const formatValue = useCallback((value, column) => {
    if (value === null || value === undefined) return '-';

    if (column === 'encounter_date' && Array.isArray(value)) {
      return new Date(...(value as [number, number, number, number, number, number])).toLocaleString();
    }

    if (typeof value === 'number' && (column.includes('date') || column.includes('birthdate'))) {
      return new Date(value).toLocaleString();
    }

    if (value === 'TRUE' || value === 'FALSE') {
      return value === 'TRUE' ? 'Yes' : 'No';
    }

    return value.toString();
  }, []);

  const rows = useMemo(() => {
    if (!data?.results?.length) return [];
    return data.results.map((result) => {
      const row = {};
      result.record.forEach((item) => {
        if (selectedColumns.some((col) => col.key === item.column)) {
          row[item.column] = formatValue(item.value, item.column);
        }
      });
      return { id: result.serialId.toString(), ...row };
    });
  }, [data, selectedColumns, formatValue]);

  const loading = !data && !error && reportRequested;

  const handleDownloadPDF = () => {
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 20],
      content: [
        { text: reportName, style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: Array(headers.length).fill('*'),
            body: [
              headers.map((header) => ({ text: header.header || '', style: 'tableHeader' })),
              ...rows.map((row) =>
                headers.map((header) => ({
                  text: row[header.key] || '-',
                  style: 'tableCell',
                })),
              ),
            ],
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex % 2 === 0 ? '#f2f2f2' : null),
            hLineColor: () => '#cccccc',
            vLineColor: () => '#cccccc',
          },
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 20],
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black',
        },
        tableCell: {
          fontSize: 8,
          color: 'black',
        },
      },
      defaultStyle: {
        font: 'Roboto',
      },
      fonts: {
        Helvetica: {
          normal: 'Roboto',
          bold: 'Roboto-Bold',
          italics: 'Roboto-Italic',
          bolditalics: 'Roboto-BoldOblique',
        },
      },
    };

    pdfMake.createPdf(docDefinition).download(`${reportName}.pdf`);
  };

  const handleDownloadCSV = () => {
    if (!data?.results?.length) return;

    const csvContent = [
      headers.map((header) => header.header).join(','),
      ...rows.map((row) => headers.map((header) => row[header.key] || '-').join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${reportName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownload = () => {
    if (headers.length > 10) {
      handleDownloadCSV();
    } else {
      handleDownloadPDF();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReportRequested(true);
    mutate();
  };

  const resetStates = () => {
    setReportId('');
    setParameterValues({});
    setReportRequested(false);
    setReportName('Report Data');
    setSelectedColumns([]);
    setAvailableColumns([]);
  };

  return (
    <div className={styles.homeContainer}>
      <div>
        <OHRIWelcomeSection title={t('reportingDemo', 'Reporting Dashboard')} />
        <ReportFilters
          config={config}
          reportId={reportId}
          setReportId={setReportId}
          parameterValues={parameterValues}
          setParameterValues={setParameterValues}
          handleSubmit={handleSubmit}
          setReportRequested={setReportRequested}
          setReportName={setReportName}
          availableColumns={availableColumns}
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          handleDownloadPDF={handleDownloadPDF}
          handleDownloadCSV={handleDownloadCSV}
          mutate={mutate}
          resetStates={resetStates}
        />
      </div>

      <div className={styles.contentWrapper}>
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
            <DataTable
              rows={rows}
              headers={headers}
              isSortable
              useZebraStyles
              overflowMenuOnHover
              experimentalAutoAlign
              locale={navigator.language}
              useStaticWidth={false}
            >
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
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value || '-'}</TableCell>
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
    </div>
  );
};

export default ReportComponent;