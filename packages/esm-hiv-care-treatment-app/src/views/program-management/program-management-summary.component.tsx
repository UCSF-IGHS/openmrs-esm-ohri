import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import programManagementTabConfigSchema from './program-management-config.json';
import {
  getARTDateValue,
  getARTReasonValue,
  getARTTherapyNameMappings,
  getTransferVerifiedValue,
} from './utils/program-management-utils';

interface OverviewListProps {
  patientUuid: string;
}

const ProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  const { patientChartWorkflowSchemas } = config;

  const tabs = getMenuItemTabConfiguration(programManagementTabConfigSchema);

  console.log(patientChartWorkflowSchemas, 'schemas');

  function updateStatusTagColumn(tabs) {
    for (let tab of tabs) {
      for (let column of tab.columns) {
        if (tab.name === 'Transfer Out' && column.key === 'verified') {
          column.getValue = (encounter) => getTransferVerifiedValue(encounter, column.concept);
        }
      }
    }
  }

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
