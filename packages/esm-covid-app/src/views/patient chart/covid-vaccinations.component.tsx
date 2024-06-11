import React from 'react';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';

import covidVaccinationsSchemaConfig from './covid-vaccinations-schema.json';
import { configSchema } from '../../config-schema';

interface CovidVaccinationsWidgetProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';

const CovidVaccinations: React.FC<CovidVaccinationsWidgetProps> = ({ patientUuid }) => {
  const tabs = getMenuItemTabConfiguration(covidVaccinationsSchemaConfig, configSchema);

  return (
    <>
      {tabs.map((tab) => (
        <EncounterList
          patientUuid={patientUuid}
          encounterType={tab.encounterType}
          formList={tab.formList}
          columns={tab.columns}
          description={tab.description}
          headerTitle={tab.headerTitle}
          launchOptions={tab.launchOptions}
        />
      ))}
    </>
  );
};

export default CovidVaccinations;
