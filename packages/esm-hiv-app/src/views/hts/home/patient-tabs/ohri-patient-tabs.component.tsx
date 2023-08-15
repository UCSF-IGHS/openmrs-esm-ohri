import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from './ohri-patient-tabs.scss';
import { CohortPatientList } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  htsRetrospectiveEncounterType,
  postTestCounsellingCohort,
  preTestCounsellingCohort,
  waitingForHIVTestCohort,
} from '../../../../constants';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../../../../index';

function OHRIPatientTabs() {
  const { t } = useTranslation();
  const formName = 'POC OHRI HTS Form';
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        <Tab>{t('waitingForPretestCounselling', 'Waiting for pre-test counselling')}</Tab>
        <Tab>{t('wiatingForHivTest', 'Waiting for HIV test')}</Tab>
        <Tab>{t('WaitingForPosttestCounselling')}</Tab>
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
              name: formName,
              intent: 'HTS_PRETEST',
              actionText: t('startPretest', 'Start Pre-test'),
              editLatestEncounter: true,
              encounterType: htsRetrospectiveEncounterType,
              targetDashboard: 'hts-summary',
            }}
            moduleName={moduleName}
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
              name: formName,
              intent: 'HTS_HIVTEST',
              actionText: t('startHIVTest', 'Start HIV Test'),
              editLatestEncounter: true,
              encounterType: htsRetrospectiveEncounterType,
              targetDashboard: 'hts-summary',
            }}
            moduleName={moduleName}
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
              name: formName,
              intent: 'HTS_POSTTEST',
              actionText: t('startPostTestCounselling', 'Start Post-test counselling'),
              editLatestEncounter: true,
              encounterType: htsRetrospectiveEncounterType,
              targetDashboard: 'hts-summary',
            }}
            moduleName={moduleName}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default OHRIPatientTabs;
