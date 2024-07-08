import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import htsTestingSchemaConfig from './hts-prevention-schema-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const HTSPreventionSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return <EncounterListTabsComponent patientUuid={patientUuid} configSchema={htsTestingSchemaConfig} config={config} />;
};

export default HTSPreventionSummary;
