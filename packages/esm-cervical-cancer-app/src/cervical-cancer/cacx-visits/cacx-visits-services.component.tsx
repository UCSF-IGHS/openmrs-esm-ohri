import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { getMenuItemTabConfiguration, TabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import cacxConfigSchema from './cacx-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const CaCxCervicalCancerServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  const tabs = getMenuItemTabConfiguration(cacxConfigSchema, config);

  return <TabsComponent patientUuid={patientUuid} tabsConfig={tabs} />;
};

export default CaCxCervicalCancerServices;
