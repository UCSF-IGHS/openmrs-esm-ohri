import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import generalConsellingConfigSchema from './general-conselling-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const GeneralCounsellingSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  const tabFilter = (encounter, formName) => {
    return encounter?.form?.name === formName;
  };

  return (
    <EncounterListTabsComponent
      patientUuid={patientUuid}
      configSchema={generalConsellingConfigSchema}
      config={config}
      filter={tabFilter}
    />
  );
};

export default GeneralCounsellingSummary;
