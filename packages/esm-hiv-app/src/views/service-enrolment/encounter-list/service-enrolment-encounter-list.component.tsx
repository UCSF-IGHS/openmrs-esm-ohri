import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  careAndTreatmentEncounterType,
  dateOfHIVDiagnosisConcept,
  patientTypeEnrollmentConcept,
  studyPopulationTypeConcept,
  entryPointConcept,
} from '../../../constants';
import {
  EncounterList,
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
} from 'openmrs-esm-ohri-commons-lib';

interface ServiceEnrolmentProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'date',
    header: 'Date of service enrolment',
    getValue: encounter => {
      return getEncounterValues(encounter, 'encounterDatetime', true);
    },
    link: {
      handleNavigate: encounter => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'clientDescription',
    header: 'Patient Type at Enrollment',
    getValue: encounter => {
      return getObsFromEncounter(encounter, patientTypeEnrollmentConcept);
    },
  },
  {
    key: 'dateConfirmedPositive',
    header: 'Date Confirmed HIV Positive',
    getValue: encounter => {
      return getObsFromEncounter(encounter, dateOfHIVDiagnosisConcept, true);
    },
  },
  {
    key: 'entryPoint',
    header: 'Entry Point',
    getValue: encounter => {
      return getObsFromEncounter(encounter, entryPointConcept);
    },
  },
  {
    key: 'populationType',
    header: 'Population Type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, studyPopulationTypeConcept);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const ServiceEnrolmentWidget: React.FC<ServiceEnrolmentProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('serviceEnrolment', 'Service Enrolment');
  const displayText = t('serviceEnrolment', 'Service Enrolment');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={careAndTreatmentEncounterType}
      form={{ package: 'hiv', name: 'service_enrolment' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
    />
  );
};

export default ServiceEnrolmentWidget;
