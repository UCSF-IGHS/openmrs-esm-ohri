import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../..';
import { useConfig } from '@openmrs/esm-framework';

const TbTreatmentFollowUpList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const headerTitle = t('TbTreatmentFollowUp', 'TB Follow-up');
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.visitDate, true);
        },
      },
      {
        key: 'caseId',
        header: t('caseId', 'Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.followUpCaseId);
        },
      },
      {
        key: 'monthOfTreatment',
        header: t('monthOfTreatment', 'Month of Treatment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.monthOfTreatment);
        },
      },
      {
        key: 'adherenceAssessment',
        header: t('adherenceAssessment', 'Adherence Assessment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.adherenceAssessment);
        },
      },
      {
        key: 'nextAppointment',
        header: t('nextAppointment', 'Next Appointment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.nextAppointmentDate, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'TB Follow-up Form' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'TB Follow-up Form' },
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
      encounterType={config.encounterTypes.tbTreatmentAndFollowUp}
      formList={[{ name: 'TB Follow-up Form' }]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default TbTreatmentFollowUpList;
