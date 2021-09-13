import React, { useEffect } from 'react';
import { Tabs, Tab, Row, Column } from 'carbon-components-react';
import styles from './ohri-patient-tabs.scss';
import CohortPatientList from '../../../../components/patient-lists/patient-list-cohort.component';
import { postTestCounsellingCohort, preTestCounsellingCohort, waitingForHIVTestCohort } from '../../../../constants';

function OHRIPatientTabs({ launchFormWorkSpace }) {
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <Tab id="tab-1" label="Waiting for pre-test counselling">
        <CohortPatientList
          cohortId={preTestCounsellingCohort}
          cohortSlotName="pre-test-counseling-slot"
          launchFormWorkSpace={launchFormWorkSpace}
        />
      </Tab>
      <Tab id="tab-2" label="Waiting for HIV test">
        <CohortPatientList
          cohortId={waitingForHIVTestCohort}
          cohortSlotName="waiting-for-hiv-testing-slot"
          launchFormWorkSpace={launchFormWorkSpace}
        />
      </Tab>
      <Tab id="tab-3" label="Waiting for post-test counselling">
        <CohortPatientList
          cohortId={postTestCounsellingCohort}
          cohortSlotName="post-test-counseling-slot"
          launchFormWorkSpace={launchFormWorkSpace}
        />
      </Tab>
    </Tabs>
  );
}

export default OHRIPatientTabs;
