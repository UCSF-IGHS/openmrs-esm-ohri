import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  SummaryCard,
  SummaryCardColumn,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../../..';

const TptPatientSummary: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const headerRecentTPT = t('recentTpt', 'Recent TPT Cases');
  const headerPreviousCases = t('previousCases', 'Previous TPT Cases');

  const recentTbPreventionColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'tptTreatmentId',
        header: t('tptTreatmentId', 'TPT Treatment ID'),
        encounterTypes: [config.encounterTypes.tptCaseEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tptTreatmentId);
        },
      },
      {
        key: 'tptEnrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        encounterTypes: [config.encounterTypes.tptCaseEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tptEnrollmentDate, true);
        },
      },
      {
        key: 'tptIndication',
        header: t('indication', 'Indication'),
        encounterTypes: [config.encounterTypes.tptCaseEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tptIndication);
        },
      },
      {
        key: 'tptRegimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [config.encounterTypes.tptCaseEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tptRegimen);
        },
      },
       {
         key: 'tptAdherence',
         header: t('tptAdherence', 'Adherence'),
         encounterTypes: [config.encounterTypes.tptTreatmentAndFollowUp],
         getObsValue: (encounter) => {
           return getObsFromEncounter(encounter, config.obsConcepts.tptAdherence);
         },
       },
      {
        key: 'tptAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterTypes: [config.encounterTypes.tptTreatmentAndFollowUp],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tptAppointmentDate, true);
        },
      },
    ],
    [],
  );

  return (
    <>
      <SummaryCard
        patientUuid={patientUuid}
        headerTitle={headerRecentTPT}
        columns={recentTbPreventionColumns}
        maxRowItems={4}
      />
      <EmptyStateComingSoon displayText={headerPreviousCases} headerTitle={headerPreviousCases}/>
    </>
  );
};

export default TptPatientSummary;
