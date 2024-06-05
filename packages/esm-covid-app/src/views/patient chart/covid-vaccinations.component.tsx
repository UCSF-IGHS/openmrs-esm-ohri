import React from 'react';
import {
  EncounterList,
  findObs,
  getObsFromEncounter,
  getMenuItemTabConfiguration,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import covidVaccinationsSchemaConfig from './covid-vaccinations-schema.json';

interface CovidVaccinationsWidgetProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';

const CovidVaccinations: React.FC<CovidVaccinationsWidgetProps> = ({ patientUuid }) => {
  const config = useConfig();
  const tabs = getMenuItemTabConfiguration(covidVaccinationsSchemaConfig);

  const getVaccineAdministeredValue = (encounter) => {
    const obs = findObs(encounter, config.obsConcepts.covidVaccineAdministeredConcept_UUID);
    if (typeof obs !== undefined && obs) {
      if (typeof obs.value === 'object') {
        if (obs !== undefined) {
          const vaccineNAME =
            obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
            obs.value.name.name;
          if (vaccineNAME === 'Other non-coded') {
            return getObsFromEncounter(encounter, config.obsConcepts.covidVaccineConcept_UUID);
          }
        }
      }
    }
    return getObsFromEncounter(encounter, config.obsConcepts.covidVaccineAdministeredConcept_UUID);
  };

  function updateAdministeredVaccineColumn(tabs) {
    for (let tab of tabs) {
      for (let column of tab.columns) {
        if (column.key === 'covidVaccineType') {
          column.getValue = (encounter) => getVaccineAdministeredValue(encounter);
        }
      }
    }
  }

  updateAdministeredVaccineColumn(tabs);

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
