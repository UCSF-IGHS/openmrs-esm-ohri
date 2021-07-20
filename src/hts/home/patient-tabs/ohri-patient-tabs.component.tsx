import React, { useEffect } from 'react';
import { Tabs, Tab, Row, Column } from 'carbon-components-react';
import styles from './ohri-patient-tabs.scss';
import { attach, ExtensionSlot } from '@openmrs/esm-framework';

function OHRIPatientTabs() {
  useEffect(() => {
    attach('pre-test-list-slot', 'patient-table');
    attach('hiv-test-list-slot', 'patient-table');
    attach('post-test-list-slot', 'patient-table');
  }, []);

  return (
    <Row className={styles.container}>
      <Tabs type="container">
        <Tab id="tab-1" label="Waiting for pre-test counselling">
          <ExtensionSlot extensionSlotName={PretestListSlot} />
        </Tab>
        <Tab id="tab-2" label="Waiting for HIV test">
          <ExtensionSlot extensionSlotName={HivtestListSlot} />
        </Tab>
        <Tab id="tab-3" label="Waiting for post-test counselling">
          <ExtensionSlot extensionSlotName={PosttestListSlot} />
        </Tab>
      </Tabs>
    </Row>
  );
}

export default OHRIPatientTabs;
export const PretestListSlot = 'pre-test-list-slot';
export const HivtestListSlot = 'hiv-test-list-slot';
export const PosttestListSlot = 'post-test-list-slot';
