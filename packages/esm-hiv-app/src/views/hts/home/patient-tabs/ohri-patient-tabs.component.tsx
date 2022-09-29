import React, { useEffect } from 'react';
import { Tabs, Tab, Row, Column } from '@carbon/react';
import styles from './ohri-patient-tabs.scss';
import { CohortPatientList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  htsRetrospectiveEncounterType,
  postTestCounsellingCohort,
  preTestCounsellingCohort,
  waitingForHIVTestCohort,
} from '../../../../constants';
import { useTranslation } from 'react-i18next';

function OHRIPatientTabs() {
  const { t } = useTranslation();
  const formPackage = 'hiv';
  const formName = 'hts';
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <Tab id="tab-1" label={t('waitingForPretestCounselling', 'Waiting for pre-test counselling')}>
        <CohortPatientList
          cohortId={preTestCounsellingCohort}
          cohortSlotName="pre-test-counseling-slot"
          associatedEncounterType={htsRetrospectiveEncounterType}
          addPatientToListOptions={{
            isEnabled: true,
            excludeCohorts: ['Post-Test Counselling'],
          }}
          launchableForm={{
            package: formPackage,
            name: formName,
            intent: 'HTS_PRETEST',
            actionText: t('startPretest', 'Start Pre-test'),
            editLatestEncounter: true,
            encounterType: htsRetrospectiveEncounterType,
            targetDashboard: 'hts-summary',
          }}
        />
      </Tab>
      <Tab id="tab-2" label={t('wiatingForHivTest', 'Waiting for HIV test')}>
        <CohortPatientList
          cohortId={waitingForHIVTestCohort}
          cohortSlotName="waiting-for-hiv-testing-slot"
          addPatientToListOptions={{
            isEnabled: true,
            excludeCohorts: [],
          }}
          launchableForm={{
            package: formPackage,
            name: formName,
            intent: 'HTS_HIVTEST',
            actionText: t('startHIVTest', 'Start HIV Test'),
            editLatestEncounter: true,
            encounterType: htsRetrospectiveEncounterType,
            targetDashboard: 'hts-summary',
          }}
        />
      </Tab>
      <Tab id="tab-3" label={t('waitingForPostTest', 'Waiting for post-test counselling')}>
        <CohortPatientList
          cohortId={postTestCounsellingCohort}
          cohortSlotName="post-test-counseling-slot"
          addPatientToListOptions={{
            isEnabled: true,
            excludeCohorts: [],
          }}
          launchableForm={{
            package: formPackage,
            name: formName,
            intent: 'HTS_POSTTEST',
            actionText: t('startPostTestCounselling', 'Start Post-test counselling'),
            editLatestEncounter: true,
            encounterType: htsRetrospectiveEncounterType,
            targetDashboard: 'hts-summary',
          }}
        />
      </Tab>
    </Tabs>
  );
}

export default OHRIPatientTabs;
