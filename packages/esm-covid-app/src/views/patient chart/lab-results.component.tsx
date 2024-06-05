import React from 'react';
import styles from './covid.scss';
import { Tabs, Tab, Tag, TabList, TabPanels, TabPanel } from '@carbon/react';
import {
  EncounterList,
  findObs,
  getObsFromEncounter,
  getMenuItemTabConfiguration,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';
import covidLabTestSchemaConfig from './lab-results-schema-config.json';

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

const statusColorMap = {
  '1118AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'green', // not done
  '1267AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'green', // completed
  '165170AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'purple', // cancelled
  '162866AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'blue', // pending
};
interface CovidLabWidgetProps {
  patientUuid: string;
}

const renderTag = (encounter, concept) => {
  const status = getObsFromEncounter(encounter, concept);
  const statusObs = findObs(encounter, concept);
  if (status == '--') {
    return '--';
  } else {
    return (
      <Tag type={statusColorMap[statusObs?.value?.uuid]} title={status} className={styles.statusTag}>
        {status}
      </Tag>
    );
  }
};

const CovidLabResults: React.FC<CovidLabWidgetProps> = ({ patientUuid }) => {
  const config = useConfig();
  const { t } = useTranslation();
  const tabs = getMenuItemTabConfiguration(covidLabTestSchemaConfig);

  function updateStatusTagColumn(tabs, renderTag) {
    for (let tab of tabs) {
      for (let column of tab.columns) {
        if (column.key === 'labStatus') {
          column.getValue = (encounter) => renderTag(encounter, column.concept);
        }
      }
    }
  }

  updateStatusTagColumn(tabs, renderTag);

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
