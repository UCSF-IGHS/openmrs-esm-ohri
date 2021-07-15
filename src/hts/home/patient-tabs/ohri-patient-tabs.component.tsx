import React from 'react';
import { Tabs, Tab, Row } from 'carbon-components-react';
import styles from './ohri-patient-tabs.scss';

function OHRIPatientTabs() {
  return (
    <Row className={styles.container}>
      <Tabs type="container">
        <Tab id="tab-1" label="Waiting for pre-test counselling">
          <Row className={styles.tabContent}>Content for second tab goes here.</Row>
        </Tab>
        <Tab id="tab-2" label="Waiting for HIV test" className={styles.tabContent}>
          <div>Content for second tab goes here.</div>
        </Tab>
        <Tab id="tab-3" label="Waiting for post-test counselling" className={styles.tabContent}>
          <div className={styles.tabContent}>Content for second tab goes here.</div>
        </Tab>
      </Tabs>
    </Row>
  );
}

export default OHRIPatientTabs;
