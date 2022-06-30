import { getObsFromEncounter, OHRIPatientListTabs } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  allPatientsCohort,
  Cd4LabResultDate_UUID,
  CD4LabResultsEncounter_UUID,
  ViralLoadResultDate_UUID,
  ViralLoadResultsEncounter_UUID,
} from '../../../../constants';

function LabResultsPatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('cd4Results', 'CD4 Results'),
      cohortId: allPatientsCohort,
      isReportingCohort: true,
      cohortSlotName: 'cd4-results-slot',
      launchableForm: {
        package: 'hiv',
        name: 'cd4_lab_results',
        actionText: 'View Result',
        intent: '*',
        targetDashboard: 'lab-results',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      otherColumns: [
        {
          key: 'cd4Result',
          header: t('cd4Result', 'Recent CD4'),
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, CD4LabResultsEncounter_UUID);
          },
          index: 1,
        },
        {
          key: 'cd4ResultDate',
          header: t('cd4ResultDate', 'Recent CD4 Date'),
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, Cd4LabResultDate_UUID, true);
          },
        },
      ],
    },
    {
      label: t('viroalLoadResults', 'Viral Load Results'),
      cohortId: allPatientsCohort,
      isReportingCohort: true,
      cohortSlotName: 'vl-results-slot',
      launchableForm: {
        package: 'hiv',
        name: 'viral_load_results',
        actionText: 'View Result',
        intent: '*',
        targetDashboard: 'lab-results',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location'],
      otherColumns: [
        {
          key: 'vlResult',
          header: t('vlResult', 'Recent VL'),
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, ViralLoadResultsEncounter_UUID);
          },
          index: 1,
        },
        {
          key: 'vlDate',
          header: t('vlDate', 'Recent VL Date'),
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, ViralLoadResultDate_UUID, true);
          },
        },
      ],
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} />;
}

export default LabResultsPatientTabs;
