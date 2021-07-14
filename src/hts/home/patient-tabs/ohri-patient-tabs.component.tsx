import React from 'react';
import { Tabs, Tab, Row } from 'carbon-components-react';
import styles from './ohri-patient-tabs.scss';

function OHRIPatientTabs() {
  return (
    <Row className={styles.container}>
      <Tabs type="container">
        <Tab className={styles.tabContainer} id="tab-1" label="Waiting for pre-test counselling">
          <p>Content for first tab goes here.</p>
        </Tab>
        <Tab className={styles.tabContainer} id="tab-2" label="Waiting for HIV test">
          <p>Content for second tab goes here.</p>
        </Tab>
        <Tab id="tab-3" label="Waiting for post-test counselling" title="Tab label 3 shows truncation">
          <p>Content for third tab goes here.</p>
        </Tab>
        <Tab className={styles.customTab} label={<div className={styles.customTabContent}>View all lists</div>}>
          <p>Content for fourth tab goes here.</p>
        </Tab>
      </Tabs>
    </Row>
  );
}

export default OHRIPatientTabs;
