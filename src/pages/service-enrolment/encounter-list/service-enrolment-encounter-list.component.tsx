import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  careAndTreatmentEncounterType,
  dateOfHIVDiagnosisConcept,
  patientTypeEnrollmentConcept,
  studyPopulationTypeConcept,
} from '../../../constants';
import EncounterList, {
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
} from '../../../components/encounter-list/encounter-list.component';

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
    header: 'Description of client',
    getValue: encounter => {
      return getObsFromEncounter(encounter, patientTypeEnrollmentConcept);
    },
  },
  {
    key: 'populationCategory',
    header: 'Population category',
    getValue: encounter => {
      return getObsFromEncounter(encounter, studyPopulationTypeConcept);
    },
  },
  {
    key: 'dateConfirmedPositive',
    header: 'Date confirmed positive',
    getValue: encounter => {
      return getObsFromEncounter(encounter, dateOfHIVDiagnosisConcept, true);
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
