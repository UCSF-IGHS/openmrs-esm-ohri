import React from 'react';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import cacxConfigSchema from './cacx-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const CaCxCervicalCancerServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return <EncounterListTabsComponent patientUuid={patientUuid} configSchema={cacxConfigSchema} config={config} />;
};

export default CaCxCervicalCancerServices;
