import React from 'react';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import maternalHealthTabConfigSchema from './maternal-health-config.json';
import { useConfig } from '@openmrs/esm-framework';

interface OverviewListProps {
  patientUuid: string;
}

const MaternalHealthSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();
  return (
    <EncounterListTabsComponent
      patientUuid={patientUuid}
      configSchema={maternalHealthTabConfigSchema}
      config={config}
    />
  );
};

export default MaternalHealthSummary;
