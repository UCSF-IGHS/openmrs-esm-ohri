import React from 'react';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import tbFollowupConfigSchema from './tb-contact-listing-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TbContactTracingList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const tabs = getMenuItemTabConfiguration(tbFollowupConfigSchema);

  return (
    <>
      {tabs.map((tab) => (
        <EncounterList
          patientUuid={patientUuid}
          encounterType={tab.encounterType}
          formList={tab.formList}
          columns={tab.columns}
          description={tab.description}
          headerTitle={tab.headerTitle}
          launchOptions={tab.launchOptions}
        />
      ))}
    </>
  );
};

export default TbContactTracingList;
