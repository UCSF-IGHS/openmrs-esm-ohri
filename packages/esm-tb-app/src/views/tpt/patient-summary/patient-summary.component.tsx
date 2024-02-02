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
  const { obsConcepts, encounterTypes } = useConfig();

  const headerRecentTPT = t('recentTptCases', 'Recent TPT Cases');
  const headerPreviousTptCases = t('previousTptCases', 'Previous TPT Cases');
  const headerVisit = t('visits', 'Visits');

  const recentTbPreventionColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'tptTreatmentId',
        header: t('tptTreatmentId', 'TPT Treatment ID'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptTreatmentId);
        },
      },
      {
        key: 'tptEnrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptEnrollmentDate, true);
        },
      },
      {
        key: 'tptIndication',
        header: t('indication', 'Indication'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptIndication);
        },
      },
      {
        key: 'tptRegimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptRegimen);
        },
      },
      {
        key: 'tptAdherence',
        header: t('tptAdherence', 'Adherence'),
        encounterTypes: [encounterTypes.tptTreatmentAndFollowUp],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptAdherence);
        },
      },
      {
        key: 'tptAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterTypes: [encounterTypes.tptTreatmentAndFollowUp],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.tptAppointmentDate, true);
        },
      },
    ],
    [],
  );

  const previousTptCasesColumns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'tptTreatmentId',
        header: t('tptTreatmentId', 'TPT Treatment ID'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptTreatmentId);
        },
      },
      {
        key: 'tptEnrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptEnrollmentDate, true);
        },
      },
      {
        key: 'indication',
        header: t('indication', 'Indication'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.indication);
        },
      },
      {
        key: 'tptRegimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptRegimen);
        },
      },
      {
        key: 'tptOutcome',
        header: t('outcome', 'Outcome'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptOutcome);
        },
      },
      {
        key: 'tptDateOutcome',
        header: t('dateOutcome', 'Date of Outcome'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptDateOutcome, true);
        },
      },
    ],
    [],
  );

  const TptVisitsColumns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseID', 'Case ID'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptTreatmentId);
        },
      },
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptEnrollmentDate, true);
        },
      },
      {
        key: 'tptIndication',
        header: t('indication', 'Indication'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptIndication);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [encounterTypes.tptCaseEnrollment],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptRegimen);
        },
      },
      {
        key: 'adherence',
        header: t('adherence', 'Adherence'),
        encounterTypes: [encounterTypes.tptTreatmentAndFollowUp],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptAdherence);
        },
      },
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterTypes: [encounterTypes.tptTreatmentAndFollowUp],
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptAppointmentDate, true);
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
      <EncounterList
        patientUuid={patientUuid}
        encounterType={encounterTypes.tbProgramEnrollment}
        columns={previousTptCasesColumns}
        description={headerPreviousTptCases}
        headerTitle={headerPreviousTptCases}
        formList={[{ name: 'TPT Case Enrolment form' }]}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />
      <EncounterList
        patientUuid={patientUuid}
        encounterType={encounterTypes.tptCaseEnrollment}
        columns={TptVisitsColumns}
        description={headerVisit}
        headerTitle={headerVisit}
        formList={[{ name: 'TPT Case Enrolment form' }]}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default TptPatientSummary;
