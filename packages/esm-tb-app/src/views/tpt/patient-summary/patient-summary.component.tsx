import {
  EncounterList,
  SummaryCard,
  getMenuItemTabConfiguration,
  getSummaryCardProps,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import tptPreviousCasesConfigSchema from './tpt-previous-cases-config.json';
import tptVisitsConfigSchema from './tpt-visits-config.json';
import recentTptConfigSchema from './recent-tpt-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TptPatientSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const previousCaseTabs = getMenuItemTabConfiguration(tptPreviousCasesConfigSchema);
  const tbVisitsTabs = getMenuItemTabConfiguration(tptVisitsConfigSchema);
  const summaryCardColumns = getSummaryCardProps(recentTptConfigSchema);

  return (
    <>
      <SummaryCard
        patientUuid={patientUuid}
        headerTitle={'Recent TPT Cases'}
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

export default TptPatientSummary;
