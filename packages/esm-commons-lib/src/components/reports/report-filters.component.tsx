import React from 'react';
import { ComboBox, Button, DatePicker, DatePickerInput } from '@carbon/react';
import styles from './home.component.scss';

const ReportFilters = ({
  config,
  uuid,
  reportId,
  setReportId,
  ptrackerId,
  setPtrackerId,
  personUuid,
  setPersonUuid,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSubmit,
  setReportRequested,
}) => {
  const handleDateChange = (setter) => (event) => {
    const date = event[0] ? event[0].toISOString().split('T')[0] : '';
    setter(date);
  };

  return (
    <>
      <div className={styles.centeredTextContainer}>
        <h2>Report Filters</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.datePickerContainer}>
          <ComboBox
            id="report-dropdown"
            titleText="Select Report"
            label="Select a report to display"
            items={config.reports}
            itemToString={(item) => (item ? item.name : '')}
            onChange={({ selectedItem }) => {
              if (selectedItem) {
                setReportId(selectedItem.uuid || '');
              } else {
                setReportId('');
                setPtrackerId('');
                setPersonUuid('');
                setStartDate('');
                setEndDate('');
                setReportRequested(false);
              }
            }}
          />
          <DatePicker
            datePickerType="single"
            onChange={handleDateChange(setStartDate)}
            value={startDate ? [new Date(startDate)] : []}
          >
            <DatePickerInput id="start-date" labelText="Start Date" placeholder="yyyy-mm-dd" />
          </DatePicker>
          <DatePicker
            datePickerType="single"
            onChange={handleDateChange(setEndDate)}
            value={endDate ? [new Date(endDate)] : []}
          >
            <DatePickerInput id="end-date" labelText="End Date" placeholder="yyyy-mm-dd" />
          </DatePicker>
          <Button className={styles.button} kind="tertiary" type="submit">
            View Report
          </Button>
        </div>
      </form>
    </>
  );
};

export default ReportFilters;
