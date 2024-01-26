import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getObsFromEncounter,
  OHRIPatientListTabs,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

function TptPatientListTabs() {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, cohorts } = useConfig();

  const tabsConfigs = useMemo(
    () => [
      {
        label: t('allTptClients', 'All TPT Clients'),
        cohortId: cohorts.clientsEnrolledForTb,
        isReportingCohort: true,
        cohortSlotName: 'clients-assessed-for-covid-tb',
        launchableForm: {
          editActionText: t('editFollowUpForm', 'Edit TB Follow-up Form'),
          editLatestEncounter: true,
          targetDashboard: 'tb-assessments',
          name: 'TB Follow-up Form',
        },
        associatedEncounterType: encounterTypes.tptProgramEnrollment,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'caseID',
            header: t('caseID', 'Case ID'),
            getValue: ( { latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, obsConcepts.caseID);
            },
            index: 1,
          },
          {
            key: 'EnrolmentDate',
            header: t('EnrolmentDate', 'Enrolment Date'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, obsConcepts.tptEnrollmentDate, true);
            },
          },
          {
            key: 'indication',
            header: t('indication', 'Indication'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, obsConcepts.tptIndication);
            },
          },
        ],
        viewTptPatientProgramSummary:true,
      },
    ],
    [],
  );
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
}

export default TptPatientListTabs;
