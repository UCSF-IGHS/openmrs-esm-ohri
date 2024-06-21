import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { CohortPatientList, getCohortListTabsData } from '@ohri/openmrs-esm-ohri-commons-lib';
import htsCohortTabsSchema from './hts-patient-tab-schema.json';

import styles from './hts-patient-tabs.scss';

function OHRIPatientTabs() {
  const config = useConfig();

  const tabs = getCohortListTabsData(htsCohortTabsSchema, config);

  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        {tabs.map((tab) => (
          <Tab>{tab.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel>
            <CohortPatientList {...tab.cohortListData} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default OHRIPatientTabs;
