import React from 'react';
import { Dropdown, Button, Accordion, AccordionItem, DatePicker, DatePickerInput } from '@carbon/react';
import styles from './home.component.scss';
import { ComboBox } from '@carbon/react';

const ReportFilters = ({
  config,
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
  showFilters,
  handleFiltersToggle,
}) => {
  const handleDateChange = (setter) => (event) => {
    const date = event[0] ? event[0].toISOString().split('T')[0] : '';
    setter(date);
  };

  return (
    <Accordion className={styles.accordion}>
      <AccordionItem
        className={styles.heading}
        title="Report Filters"
        open={showFilters}
        onHeadingClick={handleFiltersToggle}
      >
        <div className={styles.formContainer}>
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
                    setReportId(selectedItem.reportId || '');
                    setPtrackerId(selectedItem.ptrackerId || '');
                    setPersonUuid(selectedItem.personUuid || '');
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
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default ReportFilters;
