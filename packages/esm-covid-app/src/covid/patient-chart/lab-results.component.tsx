import React from 'react';
import { getObsFromEncounter, EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import covidLabTestSchemaConfig from './lab-results-schema-config.json';

interface CovidLabWidgetProps {
  patientUuid: string;
}

const CovidLabResults: React.FC<CovidLabWidgetProps> = ({ patientUuid }) => {
  const config = useConfig();

  let pendingLabOrdersFilter = (encounter) => {
    return getObsFromEncounter(encounter, config.obsConcepts.covidTestStatusConcept_UUID) === 'Pending';
  };

  return (
    <EncounterListTabsComponent
      patientUuid={patientUuid}
      configSchema={covidLabTestSchemaConfig}
      config={config}
      filter={pendingLabOrdersFilter}
    />
  );
};

export default CovidLabResults;
