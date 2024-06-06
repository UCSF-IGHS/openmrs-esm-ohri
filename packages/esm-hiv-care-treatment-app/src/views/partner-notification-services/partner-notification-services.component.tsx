import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Tag } from '@carbon/react';
import {
  EncounterList,
  getMenuItemTabConfiguration,
  getObsFromEncounter,
  findObs,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import partnerNotificationsConfigSchema from './patner-notification-config.json';

import styles from '../common.scss';

interface OverviewListProps {
  patientUuid: string;
}

const statusColorMap = {
  '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'red', // positive
  '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'gray', // negative
  '1067AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'purple', // unknown
};

const renderHivStatusTag = (encounter, concept) => {
  const hivStatus = getObsFromEncounter(encounter, concept);
  const hivStatusObs = findObs(encounter, concept);
  if (hivStatus == '--') {
    return '--';
  } else {
    return (
      <Tag type={statusColorMap[hivStatusObs?.value?.uuid]} title={hivStatus} className={styles.hivStatusTag}>
        {hivStatus}
      </Tag>
    );
  }
};

const PartnerNotificationServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const tabs = getMenuItemTabConfiguration(partnerNotificationsConfigSchema);

  function updateHivStatusTagColumn(tabs, renderTag) {
    for (let tab of tabs) {
      for (let column of tab.columns) {
        if (column.key === 'labStatus') {
          column.getValue = (encounter) => renderTag(encounter, column.concept);
        }
      }
    }
  }

  updateHivStatusTagColumn(tabs, renderHivStatusTag);

  const tabFilter = (encounter, formName) => {
    return encounter?.form?.name === formName;
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
                filter={tab.hasFilter ? (encounter) => tabFilter(encounter, tab.formList[0].name) : null}
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

export default PartnerNotificationServices;
