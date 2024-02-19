import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../..';

interface TptTreatmentListProps {
  patientUuid: string;
}

const TptTreatmentList: React.FC<TptTreatmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames, formUuids } = useConfig();
  const headerTitle = t('tptTreatment', 'TPT Treatment');
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'caseId',
        header: t('caseId', 'Case Id'),
        getValue: (encounter: any) => {
          return getObsFromEncounter(encounter, obsConcepts.caseID);
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
          return getObsFromEncounter(encounter, obsConcepts.tptAppointmentDate, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: formNames.TptTreatmentFormName },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: formNames.TptTreatmentFormName },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypes.tptTreatmentAndFollowUp}
      formList={[{ name: formNames.TptTreatmentFormName, uuid: formUuids.tptTreatmentFormUuid }]}
      description={headerTitle}
      headerTitle={headerTitle}
      columns={columns}
      launchOptions={{
        moduleName: moduleName,
        displayText: t('add', 'Add'),
      }}
    />
  );
};

export default TptTreatmentList;
