import React from 'react';
import {
  clientsAssessedForCovid,
  clientsWithoutCovidOutcomes,
  covidCaseAssessmentEncType,
  covidClientsWithPendingLabResults,
  covidOutcome,
  covidTestType,
  dateSpecimenCollected,
  pcrTestResultDate,
  rapidAntigenResultDate,
  todayzAppointmentsCT,
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
        actionText: 'Edit case assessment form',
      },
      associatedEncounterType: covidCaseAssessmentEncType,
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      otherColumns: [
        {
          key: 'clientId',
          header: 'Client ID',
          getValue: patient => {
            return patient.id;
          },
          index: 1,
        },
        {
          key: 'birthday',
          header: 'Date of Birth',
          getValue: patient => {
            return patient.birthdate;
          },
          index: 3,
        },
        {
          key: 'assessmentDate',
          header: 'Assessment date',
          getValue: ({ latestEncounter }) => {
            return latestEncounter && moment(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
          },
        },
        {
          key: 'status',
          header: 'Status',
          getValue: patient => {
            return '--';
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
        actionText: 'Enter test result',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      associatedEncounterType: covidCaseAssessmentEncType,
      otherColumns: [
        {
          key: 'clientId',
          header: 'Client ID',
          getValue: patient => {
            return patient.id;
          },
          index: 1,
        },
        {
          key: 'birthday',
          header: 'Date of Birth',
          getValue: patient => {
            return patient.birthdate;
          },
          index: 3,
        },
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
    {
      label: t('undocumentedOutcomes', 'Undocumented Outcomes'),
      cohortId: clientsWithoutCovidOutcomes,
      isReportingCohort: true,
      cohortSlotName: 'undocumented-outcomes-slot',
      associatedEncounterType: covidCaseAssessmentEncType,
      launchableForm: {
        package: 'covid',
        name: 'covid_outcome_tracking',
        actionText: 'Enter COVID-19 outcome',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'hivResult', 'phoneNumber'],
      otherColumns: [
        {
          key: 'clientId',
          header: 'Client ID',
          getValue: patient => {
            return patient.id;
          },
          index: 1,
        },
        {
          key: 'covidAssessmentDate',
          header: 'COVID Assessment Date',
          getValue: ({ latestEncounter }) => {
            return latestEncounter && moment(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
          },
        },
        {
          key: 'covidDiagnosisDate',
          header: 'COVID-19 Diagnosis Date',
          getValue: ({ latestEncounter }) => {
            const obs = latestEncounter?.obs?.find(observation => observation.concept.uuid === covidTestType);
            const rapidAntigen = '6cd82734-3ba5-4165-b839-0750099d72bd';
            if (obs) {
              if (obs.value.name.uuid == rapidAntigen) {
                // lookup Rapid test result date
                return getObsFromEncounter(latestEncounter, rapidAntigenResultDate, true);
              } else {
                // loockup PCR test result date
                return getObsFromEncounter(latestEncounter, pcrTestResultDate, true);
              }
            }
            return '--';
          },
        },
        {
          key: 'covidOutcome',
          header: 'COVID-19 Outcome',
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, covidOutcome, true);
          },
        },
      ],
    },
    {
      label: t('clientsWithPartialVaccination', 'Clients with partial vaccination'),
      cohortId: todayzAppointmentsCT,
      isReportingCohort: true,
      cohortSlotName: 'clients-with-partial-vaccination-slot',
      launchableForm: {
        package: 'covid',
        name: 'covid_assessment',
        actionText: 'Edit Vaccination',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'hivResult'],
      queryParams: [`value1=${new Date().toISOString().split('T')[0]}`],
      otherColumns: [
        {
          key: 'clientId',
          header: 'Client ID',
          getValue: patient => {
            return patient.id;
          },
          index: 1,
        },
        {
          key: 'lastAppointment',
          header: 'Last Appointment',
          getValue: patient => {
            return '13/01/2021';
          },
        },
        {
          key: 'appointmentDate',
          header: 'Appointment Date',
          getValue: patient => {
            return '03/03/2021';
          },
        },
      ],
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} />;
}

export default CovidHomePatientTabs;
