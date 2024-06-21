import React from 'react';
import {
  EncounterList,
  SummaryCard,
  getMenuItemTabConfiguration,
  getSummaryCardProps,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import previousCasesConfigSchema from './previous-cases-config.json';
import tbVisitsConfigSchema from './visits-config.json';
import recentTuberculosisConfigSchema from './recent-tb-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TBSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  const previousCaseTabs = getMenuItemTabConfiguration(previousCasesConfigSchema, config);
  const tbVisitsTabs = getMenuItemTabConfiguration(tbVisitsConfigSchema, config);
  const summaryCardColumns = getSummaryCardProps(recentTuberculosisConfigSchema, config);

  return (
    <>
      <SummaryCard
        patientUuid={patientUuid}
        headerTitle={'Recent Tuberculosis'}
        columns={summaryCardColumns}
        maxRowItems={4}
      />

      {previousCaseTabs.map((tab) => (
        <EncounterList
          key={tab.encounterType}
          patientUuid={patientUuid}
          encounterType={tab.encounterType}
          formList={tab.formList}
          columns={tab.columns}
          description={tab.description}
          headerTitle={tab.headerTitle}
          launchOptions={tab.launchOptions}
        />
      ))}

      {tbVisitsTabs.map((tab) => (
        <EncounterList
          key={tab.encounterType}
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

export default TBSummaryOverviewList;
