import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import styles from './encounter-list-tabs.scss';

interface TabsComponentProps {
  patientUuid: string;
  configSchema: any;
}

export const TabsComponent: React.FC<TabsComponentProps> = ({ patientUuid, configSchema }) => {
  const config = useConfig();
  const tabsConfig = getMenuItemTabConfiguration(configSchema, config);

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          {tabsConfig.map((tab) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabsConfig.map((tab) => (
            <TabPanel key={tab.name}>
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

export default TabsComponent;
