import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { EncounterList, PatientChartProps, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import styles from '../common.scss';
import tbFollowupConfigSchema from './tb-contact-listing-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TbContactTracingList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const tabs = getMenuItemTabConfiguration(tbFollowupConfigSchema);

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

export default TbContactTracingList;
