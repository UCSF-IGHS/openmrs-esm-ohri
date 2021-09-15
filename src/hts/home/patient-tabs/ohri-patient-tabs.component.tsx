import React from 'react';
import { postTestCounsellingCohort, preTestCounsellingCohort, waitingForHIVTestCohort } from '../../../constants';
import OHRIPatientListTabs from '../../../components/patient-list-tabs/ohri-patient-list-tabs.component';
import { useTranslation } from 'react-i18next';

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

export default HTSHomePatientTabs;
