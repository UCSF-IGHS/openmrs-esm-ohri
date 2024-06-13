import {
  EncounterList,
  SummaryCard,
  getMenuItemTabConfiguration,
  getSummaryCardProps,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import previousCasesConfigSchema from './previous-cases-config.json';
import tbVisitsConfigSchema from './visits-config.json';
import recentTuberculosisConfigSchema from './recent-tb-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TBSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const previousCaseTabs = getMenuItemTabConfiguration(previousCasesConfigSchema);
  const tbVisitsTabs = getMenuItemTabConfiguration(tbVisitsConfigSchema);
  const summaryCardColumns = getSummaryCardProps(recentTuberculosisConfigSchema);

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
