import {
  EmptyStateComingSoon,
  PatientChartProps,
  SummaryCard,
  SummaryCardColumn,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

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
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept);
        },
      },
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: async ([encounter]) => {
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept); // TODO this should be a date
        },
      },
      {
        key: 'type',
        header: t('type', 'Type'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept);
        },
      },
      {
        key: 'site',
        header: t('site', 'Site'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept);
        },
      },
      {
        key: 'drugSensitivity',
        header: t('drugSensitivity', 'Drug Sensitivity'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept);
        },
      },
      {
        key: 'hivStatus',
        header: t('hivStatus', 'HIV Status'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept);
        },
      },
      {
        key: 'outcome',
        header: t('outcome', 'Outcome'),
        encounterTypes: [config.encounterTypes.tbProgramEnrollment],
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.testConcept);
        },
      },
    ],
    [],
  );

  return (
    <>
      <SummaryCard patientUuid={patientUuid} headerTitle={headerRecentTB} columns={recentTuberclosisColumns} maxRowItems={4}/>

      <EmptyStateComingSoon displayText={headerPreviousCases} headerTitle={headerPreviousCases} />
      <EmptyStateComingSoon displayText={headerVisit} headerTitle={headerVisit} />
    </>
  );
};

export default TBSummaryOverviewList;
