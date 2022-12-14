import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CardSummary,
  EncounterTileColumn,
  PatientChartProps,
  ExpandableList,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  antenatalEncounterType,
  eDDConcept,
  hivStatusAtDeliveryConcept,
  hivTestResultConcept,
  labourAndDeliveryEncounterType,
  motherStatusConcept,
  nextVisitDateConcept,
  visitDate,
} from '../../../constants';

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
        encounterUuid: antenatalEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, hivTestResultConcept);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, visitDate, true);
        },
      },
      {
        key: 'expectedDeliveryDate',
        header: t('expectedDeliveryDate', 'Expected Delivery Date'),
        encounterUuid: antenatalEncounterType,
        hasSummary: true,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, eDDConcept, true);
        },
        getSummaryObsValue: (encounter) => {
          let edd = getObsFromEncounter(encounter, eDDConcept, true);
          return edd === '--' ? edd : `In ${calculateDateDifferenceInDate(edd)}`;
        },
      },
      {
        key: 'motherStatus',
        header: t('motherStatus', 'Mother Status'),
        encounterUuid: labourAndDeliveryEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, motherStatusConcept);
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
        encounterUuid: antenatalEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, nextVisitDateConcept, true);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          let nextVisitDate = getObsFromEncounter(encounter, nextVisitDateConcept, true);
          return nextVisitDate === '--' ? nextVisitDate : `In ${calculateDateDifferenceInDate(nextVisitDate)}`;
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

  const calculateDateDifferenceInDate = (givenDate: string): string => {
    const dateDifference = new Date().getTime() - new Date(givenDate).getTime();
    const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
    return `${totalDays} days`;
  };

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
