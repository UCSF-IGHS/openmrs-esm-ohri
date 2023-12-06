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
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'TB Case Enrollment Form' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'TB Case Enrollment Form' },
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
        formList={[{ name: 'TB Case Enrollment Form' }]}
        columns={previousCasesColumns}
        description={headerPreviousCases}
        headerTitle={headerPreviousCases}
        launchOptions={{
          displayText: t('add', 'Add'),
          moduleName: moduleName,
        }}
      />

      <EmptyStateComingSoon displayText={headerVisit} headerTitle={headerVisit} />
    </>
  );
};

export default TBSummaryOverviewList;
