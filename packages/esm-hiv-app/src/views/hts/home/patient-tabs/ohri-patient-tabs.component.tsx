import React, { useEffect } from 'react';
import { Tabs, Tab, Row, Column, TabList, TabPanels, TabPanel } from '@carbon/react';
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
      <TabList contained>
        <Tab>{t('waitingForPretestCounselling', 'Waiting for pre-test counselling')}</Tab>
        <Tab>{t('wiatingForHivTest', 'Waiting for HIV test')}</Tab>
        <Tab>{t('waitingForPostTest', 'Waiting for post-test counselling')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
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
        </TabPanel>
        <TabPanel>
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
        </TabPanel>
        <TabPanel>
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default OHRIPatientTabs;
