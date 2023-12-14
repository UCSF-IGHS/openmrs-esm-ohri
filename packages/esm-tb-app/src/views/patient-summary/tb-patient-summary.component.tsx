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
import { moduleName } from '../..';

const TBSummaryOverviewList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const headerRecentTB = t('recentTuberculosis', 'Recent Tuberculosis');
  const headerPreviousCases = t('previousCases', 'Previous Cases');
  const headerVisit = t('visits', 'Visits');

  const recentTuberclosisColumns: SummaryCardColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseID', 'Case ID'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, config.obsConcepts.caseID);
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, config.obsConcepts.enrollmentDate, true);
        },
      },
      {
        key: 'type',
        header: t('type', 'Type'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.type);
        },
      },
      {
        key: 'site',
        header: t('site', 'Site'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.site);
        },
      },
      {
        key: 'drugSensitivity',
        header: t('drugSensitivity', 'Drug Sensitivity'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.drugSensitivity);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.regimen);
        },
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.hivStatus);
        },
      },
      {
        key: 'outcome',
        header: t('outcome', 'Outcome'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.outcome);
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
          return getObsFromEncounter(encounter, config.obsConcepts.caseID);
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.enrollmentDate, true);
        },
      },
      {
        key: 'type',
        header: t('type', 'Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.type);
        },
      },
      {
        key: 'site',
        header: t('site', 'Site'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.site);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.regimen);
        },
      },
      {
        key: 'outcome',
        header: t('outcome', 'Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.outcome);
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
          return getObsFromEncounter(encounter, config.obsConcepts.caseID);
        },
      },
      {
        key: 'dateOfVisit',
        header: t('dateOfVisit', 'Date of Visit'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.visitDate, true);
        },
      },
      {
        key: 'monthOfVisit',
        header: t('monthOfVisit', 'Month of Visit'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.monthOfTreatment);
        },
      },
      {
        key: 'adherence',
        header: t('adherence', 'Adherence'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.adherenceAssessment);
        },
      },
      {
        key: 'adverseDrugReaction',
        header: t('adverseDrugReaction', 'Adverse Drug Reaction'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.ADR);
        },
      },
      {
        key: 'nextAppointment',
        header: t('nextAppointment', 'Next Appointment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.nextAppointmentDate, true);
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
        encounterType={config.encounterTypes.tbProgramEnrollment}
        columns={previousCasesColumns}
        description={headerPreviousCases}
        headerTitle={headerPreviousCases}
        formList={[{ name: 'TB Case Enrollment Form' }]}
        launchOptions={{
          hideFormLauncher: true,
          displayText: '',
          moduleName: moduleName,
        }}
      />

      <EncounterList
        patientUuid={patientUuid}
        encounterType={config.encounterTypes.tbTreatmentAndFollowUp}
        columns={tbVisitsColumns}
        description={headerVisit}
        headerTitle={headerVisit}
        formList={[{ name: 'TB Follow-up Form' }]}
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
