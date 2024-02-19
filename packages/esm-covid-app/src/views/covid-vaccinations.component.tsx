import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../index';
import { useConfig } from '@openmrs/esm-framework';

interface CovidVaccinationsWidgetProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';

const CovidVaccinations: React.FC<CovidVaccinationsWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const { covidVaccinationFormUuid } = config.formUuids;

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
          return getObsFromEncounter(encounter, config.obsConcepts.covidVaccinationAdministeredConcept_UUID, true);
        },
      },
      {
        key: 'doseAdministered',
        header: t('vaccineDose', 'Vaccine Dose'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidVaccinationDose_UUID);
        },
      },
      {
        key: 'vaccineSeries',
        header: t('vaccineSeries', 'Vaccine Series'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidVaccineSeriesConcept_UUID);
        },
      },
      {
        key: 'covidVaccineType',
        header: t('vaccineAdministered', 'Vaccine Administered'),
        getValue: (encounter) => {
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
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: config.formNames.CovidVaccinationFormName, package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: config.formNames.CovidVaccinationFormName, package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'Edit Form',
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('covid_Vaccinations_header', 'Vaccinations');
  const displayText = t('covid_Vaccinations_display', 'Vaccinations');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={config.encounterTypes.covidVaccinationEncounterUUID}
      formList={[{ name: config.formNames.CovidVaccinationFormName, uuid: covidVaccinationFormUuid }]}
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
