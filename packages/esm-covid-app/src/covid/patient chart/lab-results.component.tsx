import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { EncounterList, getObsFromEncounter, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import covidLabTestSchemaConfig from './lab-results-schema-config.json';

import styles from './common.scss';

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidLabWidgetProps {
  patientUuid: string;
}

const CovidLabResults: React.FC<CovidLabWidgetProps> = ({ patientUuid }) => {
  const config = useConfig();

  const tabs = getMenuItemTabConfiguration(covidLabTestSchemaConfig, config);

  let pendingLabOrdersFilter = (encounter) => {
    return getObsFromEncounter(encounter, config.obsConcepts.covidTestStatusConcept_UUID) === 'Pending';
  };

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
                filter={tab.hasFilter ? (encounter) => pendingLabOrdersFilter(encounter) : null}
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

export default CovidLabResults;
