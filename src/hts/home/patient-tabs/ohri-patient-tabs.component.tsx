import React, { useEffect } from 'react';
import { Tabs, Tab, Row, Column } from 'carbon-components-react';
import styles from './ohri-patient-tabs.scss';
import CohortPatientList from '../../../hts-home/patient-list-cohort.component';
import { postTestCounsellingCohort, preTestCounsellingCohort, waitingForHIVTestCohort } from '../../../constants';

function OHRIPatientTabs() {
  return (
    <Row className={styles.container}>
      <Tabs type="container">
        <Tab id="tab-1" label="Waiting for pre-test counselling">
          <CohortPatientList cohortId={preTestCounsellingCohort} cohortSlotName="pre-test-counseling-slot" />
        </Tab>
        <Tab id="tab-2" label="Waiting for HIV test">
          <CohortPatientList cohortId={waitingForHIVTestCohort} cohortSlotName="waiting-for-hiv-testing-slot" />
        </Tab>
        <Tab id="tab-3" label="Waiting for post-test counselling">
          <CohortPatientList cohortId={postTestCounsellingCohort} cohortSlotName="post-test-counseling-slot" />
        </Tab>
      </Tabs>
    </Row>
  );
}

export default OHRIPatientTabs;
