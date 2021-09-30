import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  covidVaccinationEncounterUUID,
  covidVaccinationStatusConcept_UUID,
  covidVaccination1stDoseDateConcept_UUID,
  covidVaccination2ndDoseDateConcept_UUID,
  covidVaccinationTypeConcept_UUID,
} from '../../constants';

//Generic Component Import
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
} from '../../components/encounter-list/encounter-list.component';

interface CovidVaccinationsWidgetProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date',
    getValue: encounter => {
      return getEncounterValues(encounter, 'encounterDatetime', true);
    },
  },
  {
    key: 'covidStatus',
    header: 'Covid Status',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidVaccinationStatusConcept_UUID);
    },
  },
  {
    key: 'covidVaccineType',
    header: 'Vaccine type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidVaccinationTypeConcept_UUID);
    },
  },
  {
    key: 'firstDose',
    header: 'First dose',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidVaccination1stDoseDateConcept_UUID, true);
    },
  },
  {
    key: 'secondDose',
    header: 'Second dose',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidVaccination2ndDoseDateConcept_UUID, true);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const CovidVaccinations: React.FC<CovidVaccinationsWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('covidVaccinations', 'Vaccinations');
  const displayText = t('covidVaccinations', 'Vaccinations');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={covidVaccinationEncounterUUID}
      form={{ package: 'covid', name: 'covid_vaccination' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
    />
  );
};

export default CovidVaccinations;
