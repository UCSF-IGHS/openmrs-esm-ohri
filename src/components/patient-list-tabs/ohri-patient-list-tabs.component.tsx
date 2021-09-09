import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from './ohri-patient-list-tabs.scss';
import CohortPatientList from '../../hts-home/patient-list-cohort.component';

function OHRIPatientListTabs({ patientListConfigs }) {
  return (
    <Tabs type="container" className={styles.tabContainer}>
      {patientListConfigs.map((config, index) => {
        return (
          <Tab id={index} label={config.label}>
            <CohortPatientList cohortId={config.cohortId} cohortSlotName={config.cohortSlotName} />
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default OHRIPatientListTabs;
