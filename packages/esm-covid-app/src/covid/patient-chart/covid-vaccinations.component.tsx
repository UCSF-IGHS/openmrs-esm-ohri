import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, getMenuItemTabConfiguration } from '@ohri/openmrs-esm-ohri-commons-lib';
import covidVaccinationsSchemaConfig from './covid-vaccinations-schema.json';

interface CovidVaccinationsWidgetProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';

const CovidVaccinations: React.FC<CovidVaccinationsWidgetProps> = ({ patientUuid }) => {
  const config = useConfig();
  const tabs = getMenuItemTabConfiguration(covidVaccinationsSchemaConfig, config);

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
