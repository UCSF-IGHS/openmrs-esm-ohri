import React from 'react';
import { TabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import { type PatientChartProps } from '@ohri/openmrs-esm-ohri-commons-lib';
import tptProgramManagemetConfigSchema from './tb-program-management-config.json';

const ProgramManagementSummary: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const config = useConfig();

  return <TabsComponent patientUuid={patientUuid} configSchema={tptProgramManagemetConfigSchema} config={config} />;
};

export default ProgramManagementSummary;
