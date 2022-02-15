import React from 'react';
import {
  clientsAssessedForCovid,
  clientsWithoutCovidOutcomes,
  covidCaseAssessmentEncType,
  covidClientsWithPendingLabResults,
  covidOutcome,
  covidTestType,
  dateSpecimenCollected,
  finalCovid19Result,
  pcrTestResultDate,
  rapidAntigenResultDate,
} from '../../../constants';
import OHRIPatientListTabs from '../../../components/patient-list-tabs/ohri-patient-list-tabs.component';
import { useTranslation } from 'react-i18next';
import { getObsFromEncounter } from '../../../components/encounter-list/encounter-list.component';
import moment from 'moment';

function CovidHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('allCTClients', 'All COVID-19 Clients'),
      cohortId: clientsAssessedForCovid,
      isReportingCohort: true,
      cohortSlotName: 'clients-assessed-for-covid-slot',
      launchableForm: {
        package: 'covid',
        name: 'covid_assessment',
        editActionText: 'Edit case assessment form',
        editLatestEncounter: true,
        targetDashboard: 'covid-assessments',
      },
      associatedEncounterType: covidCaseAssessmentEncType,
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      otherColumns: [
        {
          key: 'assessmentDate',
          header: 'Assessment date',
          getValue: ({ latestEncounter }) => {
            return latestEncounter && moment(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
          },
          index: 3,
        },
        {
          key: 'finalAssessment',
          header: 'Final result',
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, finalCovid19Result);
          },
        },
        {
          key: 'outcome',
          header: 'Outcome',
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, covidOutcome);
          },
        },
      ],
    },
    {
      label: t('pendingLabResults', 'Pending lab results'),
      cohortId: covidClientsWithPendingLabResults,
      isReportingCohort: true,
      cohortSlotName: 'pending-covid-lab-results-slot',
      launchableForm: {
        package: 'covid',
        name: 'covid_lab_test',
        editActionText: 'Enter test result',
        editLatestEncounter: true,
        targetDashboard: 'covid-lab-results',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      associatedEncounterType: covidCaseAssessmentEncType,
      otherColumns: [
        {
          key: 'testDate',
          header: 'Test Date',
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, dateSpecimenCollected, true);
          },
        },
        {
          key: 'testType',
          header: 'Test Type',
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, covidTestType);
          },
        },
      ],
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} />;
}

export default CovidHomePatientTabs;
