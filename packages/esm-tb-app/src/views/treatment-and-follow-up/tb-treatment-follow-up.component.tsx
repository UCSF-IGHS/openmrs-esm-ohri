import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import tbFollowupConfigSchema from './tb-treatment-followup-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TbTreatmentFollowUpList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  const tabs = getMenuItemTabConfiguration(tbFollowupConfigSchema, config);

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

export default TbTreatmentFollowUpList;
