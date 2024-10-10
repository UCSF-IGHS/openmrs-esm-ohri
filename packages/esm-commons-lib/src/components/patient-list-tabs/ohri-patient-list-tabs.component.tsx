import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { CohortPatientList } from '../cohort-patient-list/cohort-patient-list.component';

import styles from './ohri-patient-list-tabs.scss';

export function OHRIPatientListTabs({ patientListConfigs, moduleName }) {
  const { t } = useTranslation();
  const [activeTabIndex, setActiveTabIndex] = useState(0); // State to track active tab index
  const handleTabChange = ({selectedIndex}) => {
    setActiveTabIndex(selectedIndex);
  };
  return (
    <Tabs type="container" className={styles.tabContainer} onChange={handleTabChange}>
      <TabList contained>
        {patientListConfigs.map((config, index) => {
          return (
            <Tab key={index} id={config.cohortId}>
              {t(config.label)}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {patientListConfigs.map((config, index) => {
          return (
            <TabPanel key={index}>
              {index === activeTabIndex && (
                <CohortPatientList
                  cohortId={config.cohortId}
                  cohortSlotName={config.cohortSlotName}
                  isReportingCohort={config.isReportingCohort}
                  excludeColumns={config.excludeColumns}
                  otherColumns={config.otherColumns}
                  queryParams={config.queryParams}
                  associatedEncounterType={config.associatedEncounterType}
                  launchableForm={config.launchableForm}
                  extraAssociatedEncounterTypes={config.extraAssociatedEncounterTypes}
                  moduleName={moduleName}
                  viewPatientProgramSummary={config.viewPatientProgramSummary}
                  viewTptPatientProgramSummary={config.viewTptPatientProgramSummary}
                />
              )}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
}
