import {
  EmptyStateComingSoon,
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  SummaryCard,
  SummaryCardColumn,
  getObsFromEncounter,
  findObs,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../..';
import { getTbRegimen } from '../../tb-helper';

const TBSummaryOverviewList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerRecentTB = t('recentTuberculosis', 'Recent Tuberculosis');
  const headerPreviousCases = t('previousCases', 'Previous Cases');
  const headerVisit = t('visits', 'Visits');
  const { formNames, formUuids, encounterTypes, obsConcepts } = useConfig();

  const recentTuberclosisColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseID', 'Case ID'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.caseID);
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.enrollmentDate, true);
        },
      },
      {
        key: 'type',
        header: t('type', 'Type'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.type);
        },
      },
      {
        key: 'site',
        header: t('site', 'Site'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.site);
        },
      },
      {
        key: 'drugSensitivity',
        header: t('drugSensitivity', 'Drug Sensitivity'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.drugSensitivity);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: ([encounter]) => {
          const tBEnrollmentType = findObs(encounter, obsConcepts.tBEnrollmentType)?.value?.uuid;
          return getTbRegimen(encounter, tBEnrollmentType);
        },
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.hivStatus);
        },
      },
      {
        key: 'outcome',
        header: t('outcome', 'Outcome'),
        encounterTypes: [encounterTypes.tbProgramEnrollment],
        getObsValue: ([encounter]) => {
          return getObsFromEncounter(encounter, obsConcepts.outcome);
        },
      },
    ],
    [],
  );

  const previousCasesColumns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseID', 'Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.caseID);
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.enrollmentDate, true);
        },
      },
      {
        key: 'type',
        header: t('type', 'Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.type);
        },
      },
      {
        key: 'site',
        header: t('site', 'Site'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.site);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        getValue: (encounter) => {
          const tBEnrollmentType = findObs(encounter, obsConcepts.tBEnrollmentType)?.value?.uuid;
          return getTbRegimen(encounter, tBEnrollmentType);
        },
      },
      {
        key: 'outcome',
        header: t('outcome', 'Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.outcome);
        },
      },
    ],
    [],
  );

  const tbVisitsColumns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseID', 'Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.caseID);
        },
      },
      {
        key: 'dateOfVisit',
        header: t('dateOfVisit', 'Date of Visit'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.visitDate, true);
        },
      },
      {
        key: 'monthOfVisit',
        header: t('monthOfVisit', 'Month of Visit'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.monthOfTreatment);
        },
      },
      {
        key: 'adherence',
        header: t('adherence', 'Adherence'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.adherenceAssessment);
        },
      },
      {
        key: 'adverseDrugReaction',
        header: t('adverseDrugReaction', 'Adverse Drug Reaction'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ADR);
        },
      },
      {
        key: 'nextAppointment',
        header: t('nextAppointment', 'Next Appointment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.nextAppointmentDate, true);
        },
      },
    ],
    [],
  );

  return (
    <>
      <SummaryCard
        patientUuid={patientUuid}
        headerTitle={headerRecentTB}
        columns={recentTuberclosisColumns}
        maxRowItems={4}
      />

      <EncounterList
        patientUuid={patientUuid}
        encounterType={encounterTypes.tbProgramEnrollment}
        columns={previousCasesColumns}
        description={headerPreviousCases}
        headerTitle={headerPreviousCases}
        formList={[{ name: formNames.TptCaseEnrolmentFormName, uuid: formUuids.tptCaseEnrolmentFormUuid }]}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />

      <EncounterList
        patientUuid={patientUuid}
        encounterType={encounterTypes.tbTreatmentAndFollowUp}
        columns={tbVisitsColumns}
        description={headerVisit}
        headerTitle={headerVisit}
        formList={[{ name: formNames.TptTreatmentFormName, uuid: formUuids.tptTreatmentFormUuid }]}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />
    </>
  );
};

export default TBSummaryOverviewList;
