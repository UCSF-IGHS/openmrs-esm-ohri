import React from 'react';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import childHealthTabConfigSchema from './child-health-config.json';
import { useConfig } from '@openmrs/esm-framework';

interface OverviewListProps {
  patientUuid: string;
}

const ChildHealthSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  return (
    <EncounterListTabsComponent patientUuid={patientUuid} configSchema={childHealthTabConfigSchema} config={config} />
  );
};

export default ChildHealthSummary;
