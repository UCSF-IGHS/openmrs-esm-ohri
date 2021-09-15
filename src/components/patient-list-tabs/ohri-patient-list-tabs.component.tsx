import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from './ohri-patient-list-tabs.scss';
import CohortPatientList from '../patient-lists/patient-list-cohort.component';

function OHRIPatientListTabs({ patientListConfigs }) {
  return (
    <Tabs type="container" className={styles.tabContainer}>
      {patientListConfigs.map((config, index) => {
        return (
          <Tab id={index} label={config.label}>
            <CohortPatientList
              cohortId={config.cohortId}
              cohortSlotName={config.cohortSlotName}
              isReportingCohort={config.isReportingCohort}
              excludeColumns={config.excludeColumns}
              otherColumns={config.otherColumns}
              queryParams={config.queryParams}
              launchableForm={config.launchableForm}
            />
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default OHRIPatientListTabs;
