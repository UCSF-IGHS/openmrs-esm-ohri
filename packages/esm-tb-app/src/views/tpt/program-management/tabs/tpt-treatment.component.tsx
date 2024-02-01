import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TptTreatmentListProps {
  patientUuid: string;
}

const TptTreatmentList: React.FC<TptTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes } = useConfig();
  const headerTitle = t('tptTreatment', 'TPT Treatment');
  const columns = [
    {
      key: 'caseId',
      header: t('caseId', 'Case Id'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, obsConcepts.tptTreatmentId);
      },
    },
    {
      key: 'visitDate',
      header: t('visitDate', 'Visit Date'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, obsConcepts.followUpCaseId);
      },
    },
    {
      key: 'Regimen',
      header: t('Regimen', 'Regimen'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, obsConcepts.tptRegimen);
      },
    },
    {
      key: 'Adherence',
      header: t('Adherence', 'Adherence'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, obsConcepts.tptAdherence);
      },
    },
    {
      key: 'treatmentPlan',
      header: t('treatmentPlan', 'Treatment Plan'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, obsConcepts.treatmentPlan);
      },
    },
    {
      key: 'nextAppointment',
      header: t('nextAppointment', 'Next Appointment'),
      getValue: (encounter: any) => {
        return getObsFromEncounter(encounter, obsConcepts.tptAppointmentDate);
      },
    },
    {
      key: 'actions',
      header: t('actions', 'Actions'),
      getValue: (encounter) => [
        {
          form: { name: 'TPT Case Enrolment form' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: t('viewDetails', 'View Details'),
          mode: 'view',
        },
        {
          form: { name: 'TPT Case Enrolment form' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: t('editForm', 'Edit Form'),
          mode: 'edit',
        },
      ],
    },
  ];
  // eslint-disable-next-line no-empty-pattern

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypes.tptCaseEnrollment}
      formList={[{ name: 'TPT Case Enrolment form' }]}
      description={headerTitle}
      headerTitle={headerTitle}
      columns={columns}
      launchOptions={{
        moduleName: '',
        hideFormLauncher: false,
        displayText: t('add', 'Add'),
        workspaceWindowSize: 'minimized',
      }}
    />
  );
};

export default TptTreatmentList;
