import React, { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Dropdown,
  Button,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import { openmrsFetch, useConfig } from '@openmrs/esm-framework';
import styles from './home.component.scss';

const BASE_WS_API_URL = 'https://openmrs-dev.globalhealthapp.net/openmrs/ws/rest/v1/mamba/report';

const HomeComponent = () => {
  const config = useConfig();
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [reportId, setReportId] = useState('mother_hiv_status');
  const [ptrackerId, setPtrackerId] = useState('');
  const [personUuid, setPersonUuid] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    if (!startDate || !endDate) {
      console.error('Start date and end date must be provided.');
      return;
    }

    try {
      const url = `${BASE_WS_API_URL}?report_id=${reportId}&ptracker_id=${ptrackerId}&person_uuid=${personUuid}&start_date=${startDate}&end_date=${endDate}`;
      const response = await openmrsFetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + btoa('admin:Admin123'),
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.results.length === 0) {
        setHeaders([]);
        setRows([]);
        return;
      }

      // Extract headers from the first record
      const formattedHeaders = data.results[0].record.map((column) => ({
        key: column.column,
        header: column.column,
      }));

      const formattedRows = data.results.map((result) => {
        const row = { id: result.serialId.toString() };
        result.record.forEach((column) => {
          row[column.column] = column.value === null ? '-' : column.value;
        });
        return row;
      });

      setHeaders(formattedHeaders);
      setRows(formattedRows);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStartDateChange = (event) => {
    const date = event[0] ? event[0].toISOString().split('T')[0] : '';
    setStartDate(date);
  };

  const handleEndDateChange = (event) => {
    const date = event[0] ? event[0].toISOString().split('T')[0] : '';
    setEndDate(date);
  };

  return (
    <div className={styles.homeContainer}>
      <OHRIWelcomeSection title="Reporting Demo" />
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <div className={styles.datePickerContainer}>
          <Dropdown
            id="report-dropdown"
            titleText="Select Report"
            label="Select a report to display"
            items={config.reports}
            itemToString={(item) => (item ? item.name : '')}
            onChange={({ selectedItem }) => {
              setReportId(selectedItem.reportId || '');
              setPtrackerId(selectedItem.ptrackerId || '');
              setPersonUuid(selectedItem.personUuid || '');
            }}
          />
          <DatePicker
            datePickerType="single"
            onChange={handleStartDateChange}
            value={startDate ? [new Date(startDate)] : []}
          >
            <DatePickerInput id="start-date" labelText="Start Date" placeholder="yyyy-mm-dd" />
          </DatePicker>
          <DatePicker datePickerType="single" onChange={handleEndDateChange} value={endDate ? [new Date(endDate)] : []}>
            <DatePickerInput id="end-date" labelText="End Date" placeholder="yyyy-mm-dd" />
          </DatePicker>
        </div>
        <div className={styles.fetchButtonContainer}>
          <Button type="submit">Fetch Report</Button>
        </div>
      </form>
      <div className={styles.dataTableContainer}>
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
    </div>
  );
};

export default HomeComponent;
