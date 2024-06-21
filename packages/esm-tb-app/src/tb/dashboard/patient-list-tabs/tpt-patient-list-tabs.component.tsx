import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getObsFromEncounter, OHRIPatientListTabs } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

function TptPatientListTabs() {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, cohorts } = useConfig();

  const tabsConfigs = useMemo(
    () => [
      {
        label: t('allTptClients', 'All TPT Clients'),
        cohortId: cohorts.clientsEnrolledForTpt,
        isReportingCohort: true,
        cohortSlotName: 'clients-assessed-for-tpt',
        launchableForm: {
          editActionText: t('editTptFollowUpForm', 'Edit TPT Follow-up form'),
          editLatestEncounter: true,
          targetDashboard: 'tb-assessments',
          name: 'TPT Followup & Treatment form',
        },
        associatedEncounterType: encounterTypes.tptCaseEnrollment,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'tptTreatmentId',
            header: t('tptTreatmentId', 'TPT Treatment ID'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, obsConcepts.tptTreatmentId);
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
        viewTptPatientProgramSummary: true,
      },
    ],
    [
      cohorts.clientsEnrolledForTpt,
      encounterTypes.tptCaseEnrollment,
      obsConcepts.tptEnrollmentDate,
      obsConcepts.tptIndication,
      obsConcepts.tptTreatmentId,
      t,
    ],
  );
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
}

export default TptPatientListTabs;
