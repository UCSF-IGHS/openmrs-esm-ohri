import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import clinicalVisitConfigSchema from './clinical-visit-config.json';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';

interface OverviewListProps {
  patientUuid: string;
}

const VisitsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return (
    <EncounterListTabsComponent patientUuid={patientUuid} configSchema={clinicalVisitConfigSchema} config={config} />
  );
};

export default VisitsSummary;
