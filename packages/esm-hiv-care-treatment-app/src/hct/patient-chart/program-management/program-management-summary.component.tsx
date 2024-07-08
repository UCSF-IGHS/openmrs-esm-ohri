import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import programManagementTabConfigSchema from './program-management-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const ProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return (
    <EncounterListTabsComponent
      patientUuid={patientUuid}
      configSchema={programManagementTabConfigSchema}
      config={config}
    />
  );
};

export default ProgramManagementSummary;
