import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  covidVaccinationEncounterUUID,
  covidVaccination1stDoseDateConcept_UUID,
  covidVaccinationTypeConcept_UUID,
  covidVaccinationNextVacinationDateConcept_UUID,
  covidVaccinationAdministeredConcept_UUID,
  covidVaccinationDoseAdmininstered_UUID,
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
  // {
  //   key: 'encounterDate',
  //   header: 'Encounter Date',
  //   getValue: encounter => {
  //     return getEncounterValues(encounter, 'encounterDatetime', true);
  //   },
  // },
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
    header: 'Date of Vaccination',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidVaccinationAdministeredConcept_UUID, true);
    },
  },
  {
    key: 'doseAdministered',
    header: 'Dose Administered',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidVaccinationDoseAdmininstered_UUID);
    },
  },
  {
    key: 'covidVaccineType',
    header: 'Vacine',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidVaccinationTypeConcept_UUID);
    },
  },
  // {
  //   key: 'nextVisit',
  //   header: 'Next Vaccination Date',
  //   getValue: encounter => {
  //     return getObsFromEncounter(encounter, covidVaccinationNextVacinationDateConcept_UUID, true);
  //   },
  // },
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
      dropdownText="Add"
    />
  );
};

export default CovidVaccinations;
