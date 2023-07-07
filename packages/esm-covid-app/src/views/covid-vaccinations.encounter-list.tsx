import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  covidVaccinationEncounterUUID,
  covidVaccinationAdministeredConcept_UUID,
  covidVaccineAdministeredConcept_UUID,
  covidVaccineConcept_UUID,
  covidVaccinationDose_UUID,
  covidVaccineSeriesConcept_UUID,
} from '../constants';
import { EncounterList, EncounterListColumn, findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../index';

interface CovidVaccinationsWidgetProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';

const CovidVaccinations: React.FC<CovidVaccinationsWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      //TODO: Add Vaccination Status concept
      // {
      //   key: 'covidStatus',
      //   header: 'Covid Status',
      //   getValue: encounter => {
      //     return getObsFromEncounter(encounter, covidVaccinationStatusConcept_UUID);
      //   },
      // },
      {
        key: 'vaccinationDate',
        header: t('vaccinationDate', 'Vaccination Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidVaccinationAdministeredConcept_UUID, true);
        },
      },
      {
        key: 'doseAdministered',
        header: t('vaccineDose', 'Vaccine Dose'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidVaccinationDose_UUID);
        },
      },
      {
        key: 'vaccineSeries',
        header: t('vaccineSeries', 'Vaccine Series'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidVaccineSeriesConcept_UUID);
        },
      },
      {
        key: 'covidVaccineType',
        header: t('vaccineAdministered', 'Vaccine Administered'),
        getValue: (encounter) => {
          const obs = findObs(encounter, covidVaccineAdministeredConcept_UUID);
          if (typeof obs !== undefined && obs) {
            if (typeof obs.value === 'object') {
              if (obs !== undefined) {
                const vaccineNAME =
                  obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
                  obs.value.name.name;
                if (vaccineNAME === 'Other non-coded') {
                  return getObsFromEncounter(encounter, covidVaccineConcept_UUID);
                }
              }
            }
          }
          return getObsFromEncounter(encounter, covidVaccineAdministeredConcept_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: () => {},
      },
    ],
    [],
  );

  const headerTitle = t('covid_Vaccinations_header', 'Vaccinations');
  const displayText = t('covid_Vaccinations_display', 'Vaccinations');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={covidVaccinationEncounterUUID}
      formList={[{ name: 'COVID Vaccination Form' }]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default CovidVaccinations;
