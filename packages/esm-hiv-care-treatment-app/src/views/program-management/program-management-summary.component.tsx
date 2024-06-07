import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Tag } from '@carbon/react';
import styles from '../common.scss';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import programManagementTabConfigSchema from './program-management-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const ProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const tabs = getMenuItemTabConfiguration(programManagementTabConfigSchema);

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

export default ProgramManagementSummary;
