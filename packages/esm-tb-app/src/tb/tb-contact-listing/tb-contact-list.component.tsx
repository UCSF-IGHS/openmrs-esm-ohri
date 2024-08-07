import React from 'react';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import tbFollowupConfigSchema from './tb-contact-listing-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const TbContactTracingList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  return <EncounterListTabsComponent patientUuid={patientUuid} configSchema={tbFollowupConfigSchema} config={config} />;
};

export default TbContactTracingList;
