import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CardSummary,
  EncounterTileColumn,
  PatientChartProps,
  ExpandableList,
} from '@ohri/openmrs-esm-ohri-commons-lib';

const CurrentPregnancy: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const currentPregnancyHeader = t('currentPregnancy', 'Current Pregnancy');
  const arvTherapyHeader = t('arvTherapy', 'ARV Therapy');
  const appointmentsHeader = t('appointments', 'Appointments');
  const familyHeader = t('family', 'Family');

  const currentPregnancyColumns: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'motherHIVStatus',
        header: t('motherHIVStatus', 'Mother HIV Status'),
        encounterUuid: '--',
        getObsValue: (encounter) => {
          return '--';
        },
      },
      {
        key: 'expectedDeliveryDate',
        header: t('expectedDeliveryDate', 'Expected Delivery Date'),
        encounterUuid: '--',
        hasSummary: false,
        getObsValue: (encounter) => {
          return '--';
        },
      },
      {
        key: 'motherStatus',
        header: t('motherStatus', 'Mother Status'),
        encounterUuid: '--',
        getObsValue: () => {
          return '--';
        },
        hasSummary: false,
        getSummaryObsValue: (encounter) => {
          return '--';
        },
      },
      {
        key: 'pregancyOutcome',
        header: t('pregancyOutcome', 'Pregnancy Outcome'),
        encounterUuid: '--',
        getObsValue: (encounter) => {
          return '--';
        },
      },
    ],
    [],
  );

  const arvTherapyColumns: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'currentARVRegimen',
        header: t('currentARVRegimen', 'Current ARV Regimen'),
        encounterUuid: '--',
        getObsValue: (encounter) => {
          return '--';
        },
      },
      {
        key: 'arvStartDate',
        header: t('arvStartDate', 'ARV Start Date'),
        encounterUuid: '--',
        hasSummary: false,
        getObsValue: (encounter) => {
          return '--';
        },
      },
    ],
    [],
  );

  const appointmentsColumns: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterUuid: '--',
        getObsValue: (encounter) => {
          return '--';
        },
      },
      {
        key: 'ancVisitsAttended',
        header: t('ancVisitsAttended', 'ANC visits attended'),
        encounterUuid: '--',
        getObsValue: () => {
          return '--';
        },
        hasSummary: false,
        getSummaryObsValue: (encounter) => {
          return '--';
        },
      },
    ],
    [],
  );

  const forms = [];

  return (
    <div>
      <CardSummary patientUuid={patientUuid} headerTitle={currentPregnancyHeader} columns={currentPregnancyColumns} />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <CardSummary
          patientUuid={patientUuid}
          headerTitle={arvTherapyHeader}
          columns={arvTherapyColumns}
          isActionable={true}
        />
        <CardSummary
          patientUuid={patientUuid}
          headerTitle={appointmentsHeader}
          columns={appointmentsColumns}
          isActionable={true}
        />
      </div>

      <ExpandableList headerTitle={familyHeader} items={[]} isActionable={true} forms={forms} isStriped={true} />
    </div>
  );
};

export default CurrentPregnancy;
