import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import styles from './encounter-list-tabs.scss';

interface EncounterListTabsComponentProps {
  patientUuid: string;
  configSchema: any;
  config: any;
  filter?: (encounter: any, formName?: string) => boolean;
}

export const EncounterListTabsComponent: React.FC<EncounterListTabsComponentProps> = ({
  patientUuid,
  configSchema,
  config,
  filter,
}) => {
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
                filter={tab.hasFilter ? (encounter) => filter(encounter, tab.formList[0].name) : null}
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

export default EncounterListTabsComponent;
