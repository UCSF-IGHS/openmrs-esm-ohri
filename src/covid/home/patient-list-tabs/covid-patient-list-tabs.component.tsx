import React from 'react';
import {
  clientsAssessedForCovid,
  covidCaseAssessmentEncType,
  covidClientsWithPendingLabResults,
  covidTestType,
  dateSpecimenCollected,
  todayzAppointmentsCT,
} from '../../../constants';
import OHRIPatientListTabs from '../../../components/patient-list-tabs/ohri-patient-list-tabs.component';
import { useTranslation } from 'react-i18next';
import { getObsFromEncounter } from '../../../components/encounter-list/encounter-list.component';

function CTHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('allCTClients', 'All COVID-19 Clients'),
      cohortId: clientsAssessedForCovid,
      isReportingCohort: true,
      cohortSlotName: 'clients-assessed-for-covid-slot',
      launchableForm: {
        package: 'hiv',
        name: 'clinical_visit',
        actionText: 'Start Follow Up Visit',
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
      },
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
          key: 'assessmentDate',
          header: 'Assessment date',
          getValue: patient => {
            return '22/09/2021';
          },
        },
        {
          key: 'reasonForTesting',
          header: 'Reason for testing',
          getValue: patient => {
            return 'Contact of a case';
          },
        },
        {
          key: 'testDate',
          header: 'Test date',
          getValue: patient => {
            return '22/09/2021';
          },
        },
        {
          key: 'testResult',
          header: 'Test results',
          getValue: patient => {
            return 'Positive';
          },
        },
      ],
    },
    {
      label: t('pendingLabResults', 'Pending lab results'),
      cohortId: covidClientsWithPendingLabResults,
      isReportingCohort: true,
      cohortSlotName: 'ct-todays-appointments',
      launchableForm: {
        package: 'hiv',
        name: 'clinical_visit',
        actionText: 'Start Follow Up Visit',
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      queryParams: [`value1=${new Date().toISOString().split('T')[0]}`],
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
      cohortId: todayzAppointmentsCT,
      isReportingCohort: true,
      cohortSlotName: 'ct-todays-appointments',
      launchableForm: {
        package: 'hiv',
        name: 'clinical_visit',
        actionText: 'Start Follow Up Visit',
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location'],
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
    {
      label: t('clientsWithPartialVaccination', 'Clients with partial vaccination'),
      cohortId: todayzAppointmentsCT,
      isReportingCohort: true,
      cohortSlotName: 'ct-todays-appointments',
      launchableForm: {
        package: 'hiv',
        name: 'clinical_visit',
        actionText: 'Start Follow Up Visit',
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location'],
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

export default CTHomePatientTabs;
