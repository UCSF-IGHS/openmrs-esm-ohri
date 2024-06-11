import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import clinicalVisitConfigSchema from './clinical-visit-config.json';
import { configSchema } from '../../config-schema';

import styles from '../common.scss';

interface OverviewListProps {
  patientUuid: string;
}

const VisitsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const tabs = getMenuItemTabConfiguration(clinicalVisitConfigSchema, configSchema);
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

export default VisitsSummary;
