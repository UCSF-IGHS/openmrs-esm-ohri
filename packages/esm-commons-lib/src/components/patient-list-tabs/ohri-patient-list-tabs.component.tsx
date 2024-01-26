import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from './ohri-patient-list-tabs.scss';
import { CohortPatientList } from '../cohort-patient-list/cohort-patient-list.component';

export function OHRIPatientListTabs({ patientListConfigs, moduleName }) {
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        {patientListConfigs.map((config, index) => {
          return <Tab key={index}>{config.label}</Tab>;
        })}
      </TabList>
      <TabPanels>
        {patientListConfigs.map((config, index) => {
          return (
            <TabPanel key={index}>
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
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
}
