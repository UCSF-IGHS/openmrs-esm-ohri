import React, { useState, useEffect } from 'react';
import {
  ComboBox,
  Button,
  MultiSelect,
  TextInput,
  DatePicker,
  DatePickerInput,
  Dropdown,
  OverflowMenu,
  OverflowMenuItem,
  Accordion,
  AccordionItem,
} from '@carbon/react';
import styles from './home.component.scss';
import { Download } from '@carbon/react/icons';

const ReportFilters = ({
  config,
  reportId,
  setReportId,
  parameterValues,
  setParameterValues,
  handleSubmit,
  setReportRequested,
  setReportName,
  availableColumns,
  selectedColumns,
  setSelectedColumns,
  handleDownloadPDF,
  handleDownloadCSV,
  mutate,
  resetStates,
}) => {
  const [showColumnSelect, setShowColumnSelect] = useState(false);
  const [multiSelectKey, setMultiSelectKey] = useState(0);
  const [selectedReportName, setSelectedReportName] = useState('');
  const [isReportDisplayed, setIsReportDisplayed] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [allParametersFilled, setAllParametersFilled] = useState(false);
  const [columnsMessage, setColumnsMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (reportId) {
      const selectedReport = config.reports.find((report) => report.uuid === reportId);
      if (selectedReport) {
        setParameters(selectedReport.parameters || []);
        setSelectedReportName(selectedReport.name);
        setReportName(selectedReport.name);
        setMultiSelectKey((prevKey) => prevKey + 1);
      }
    } else {
      resetStates();
    }
  }, [reportId, config.reports, setReportName, resetStates]);

  useEffect(() => {
    const areAllParametersFilled = parameters.every((param) => parameterValues[param.name] || param.defaultValue);
    setAllParametersFilled(areAllParametersFilled);
    if (areAllParametersFilled) {
      mutate();
    }
  }, [parameters, parameterValues, mutate]);

  useEffect(() => {
    const areAllParametersFilled = parameters.every((param) => parameterValues[param.name] || param.defaultValue);
    setAllParametersFilled(areAllParametersFilled);

    if (areAllParametersFilled && availableColumns.length > 5) {
      setShowColumnSelect(true);
      setSelectedColumns(availableColumns.slice(0, 10));
    } else {
      setShowColumnSelect(false);
    }
  }, [parameters, parameterValues, availableColumns, setSelectedColumns]);

  useEffect(() => {
    if (selectedColumns.length > 0) {
      setColumnsMessage(`You have selected ${selectedColumns.length} out of ${availableColumns.length} columns`);
    }
  }, [selectedColumns, availableColumns]);

  const handleViewReport = (e) => {
    e.preventDefault();

    if (allParametersFilled && selectedColumns.length > 0) {
      setReportRequested(true);
      setIsReportDisplayed(true);
    } else {
      console.warn('Please fill out all parameters and select columns before viewing the report.');
    }
  };

  const handleComboBoxChange = ({ selectedItem }) => {
    if (selectedItem) {
      setReportId(selectedItem.uuid || '');
      const initialParameterValues = {};
      selectedItem.parameters?.forEach((param) => {
        initialParameterValues[param.name] = param.defaultValue || '';
      });
      setParameterValues(initialParameterValues);
      setReportRequested(false);
      setSelectedReportName(selectedItem.name || '');
      setReportName(selectedItem.name || '');
      setIsReportDisplayed(false);
      setAllParametersFilled(false);
    } else {
      resetStates();
    }
  };

  const handleParameterChange = (name, value) => {
    setParameterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (name, dates) => {
    const [date] = dates;
    setParameterValues((prevValues) => ({
      ...prevValues,
      [name]: date.toISOString().split('T')[0],
    }));
  };

  return (
    <div>
      <Accordion>
        <AccordionItem title="FILTERS">
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputItem}>
                <ComboBox
                  id="report-dropdown"
                  titleText="Select Report"
                  label="Select a report"
                  items={config.reports}
                  itemToString={(item) => (item ? item.name : '')}
                  onChange={handleComboBoxChange}
                  size="sm"
                />
              </div>

              {reportId && parameters.length > 0 && (
                <>
                  {parameters.map((param) => (
                    <div key={param.name} className={styles.inputItem}>
                      {param.type === 'date' ? (
                        <DatePicker
                          datePickerType="single"
                          dateFormat="Y-m-d"
                          onChange={(dates) => handleDateChange(param.name, dates)}
                        >
                          <DatePickerInput
                            id={param.name}
                            placeholder={param.defaultValue || 'yyyy-mm-dd'}
                            labelText={param.label}
                            type="text"
                            size="sm"
                          />
                        </DatePicker>
                      ) : param.type === 'dropdown' ? (
                        <div className={`${styles.inputItem} ${styles.dropdownWrapper}`}>
                          <label htmlFor={param.name} className={styles.dropdownLabel}>
                            {param.label}
                          </label>
                          <Dropdown
                            id={param.name}
                            labelText={param.label}
                            items={param.dropdownOptions}
                            itemToString={(item) => (item ? item.label : '')}
                            selectedItem={param.dropdownOptions.find(
                              (option) => option.value === parameterValues[param.name],
                            )}
                            onChange={({ selectedItem }) => handleParameterChange(param.name, selectedItem.value)}
                            size="sm"
                            className={styles.dropdown}
                          />
                        </div>
                      ) : (
                        <TextInput
                          id={param.name}
                          labelText={param.label}
                          value={parameterValues[param.name] || ''}
                          onChange={(e) => handleParameterChange(param.name, e.target.value)}
                          placeholder={param.defaultValue}
                          size="sm"
                        />
                      )}
                    </div>
                  ))}

                  {showColumnSelect && (
                    <div className={`${styles.inputItem} ${styles.columnSelectWrapper}`}>
                      <MultiSelect
                        key={multiSelectKey}
                        id="column-select"
                        titleText="Select Columns"
                        label="Select columns"
                        items={availableColumns}
                        itemToString={(item) => (item ? item.label : '')}
                        initialSelectedItems={selectedColumns}
                        onChange={({ selectedItems }) => setSelectedColumns(selectedItems)}
                        size="sm"
                      />
                    </div>
                  )}
                </>
              )}

              <div className={styles.buttonContainer}>
                {allParametersFilled && selectedColumns.length > 0 && (
                  <>
                    <>
                      <Button className={styles.button} kind="tertiary" onClick={handleViewReport} size="sm">
                        View Report
                      </Button>
                      {isReportDisplayed && (
                        <OverflowMenu flipped size="sm" renderIcon={Download} iconDescription="Download options">
                          <OverflowMenuItem itemText="Download as PDF" onClick={handleDownloadPDF} />
                          <OverflowMenuItem itemText="Download as CSV" onClick={handleDownloadCSV} />
                        </OverflowMenu>
                      )}
                    </>
                    <div className={`${styles.columnSelectMessage} ${styles.inputItem}`}>{columnsMessage}</div>
                  </>
                )}
              </div>
            </div>
          </form>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReportFilters;