import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { TabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import tptProgramManagemetConfigSchema from './tpt-program-management-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TptProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return <TabsComponent patientUuid={patientUuid} configSchema={tptProgramManagemetConfigSchema} config={config} />;
};

export default TptProgramManagementSummary;
