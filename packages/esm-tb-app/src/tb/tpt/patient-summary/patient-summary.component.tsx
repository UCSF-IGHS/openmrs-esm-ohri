import React from 'react';
import {
  EncounterList,
  SummaryCard,
  getMenuItemTabConfiguration,
  getSummaryCardProps,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import tptPreviousCasesConfigSchema from './tpt-previous-cases-config.json';
import tptVisitsConfigSchema from './tpt-visits-config.json';
import recentTptConfigSchema from './recent-tpt-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TptPatientSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  const previousCaseTabs = getMenuItemTabConfiguration(tptPreviousCasesConfigSchema, config);
  const tbVisitsTabs = getMenuItemTabConfiguration(tptVisitsConfigSchema, config);
  const summaryCardColumns = getSummaryCardProps(recentTptConfigSchema, config);

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
