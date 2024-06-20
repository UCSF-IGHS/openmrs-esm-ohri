import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import tptProgramManagemetConfigSchema from './tpt-program-management-config.json';

import styles from '../../common.scss';

interface OverviewListProps {
  patientUuid: string;
}

const TptProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  const tabs = getMenuItemTabConfiguration(tptProgramManagemetConfigSchema, config);

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          {tabs.map((tab) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel>
              <EncounterList
                patientUuid={patientUuid}
                formList={tab.formList}
                columns={tab.columns}
                encounterType={tab.encounterType}
                launchOptions={tab.launchOptions}
                headerTitle={tab.headerTitle}
                description={tab.description}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TptProgramManagementSummary;
