import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import tbFollowupConfigSchema from './tb-treatment-followup-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TbTreatmentFollowUpList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return <EncounterListTabsComponent patientUuid={patientUuid} configSchema={tbFollowupConfigSchema} config={config} />;
};

export default TbTreatmentFollowUpList;
