import React from 'react';
import { TabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import cacxConfigSchema from './cacx-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const CaCxCervicalCancerServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  return <TabsComponent patientUuid={patientUuid} configSchema={cacxConfigSchema} />;
};

export default CaCxCervicalCancerServices;
