import React from 'react';
import { OHRIPatientListTabs } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

function CTHomePatientTabs() {
  const { t } = useTranslation();
  const { obsConcepts, cohorts } = useConfig();

  const tabsConfigs = [
    {
      label: t('allCTClients', 'All C&T Clients'),
      cohortId: cohorts.clientsEnrolledToCare,
      isReportingCohort: true,
      cohortSlotName: 'all-ct-clients-slot',
      launchableForm: {
        name: 'Clinical Visit Form',
        actionText: t('startFollowUpVisit', 'Start Follow Up Visit'),
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
        targetDashboard: 'hts-summary',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location'],
      otherColumns: [
        {
          key: 'clientId',
          header: t('clientId', 'Client ID'),
          getValue: (patient) => {
            return patient.id;
          },
          index: 1,
        },
        {
          key: 'lastAppointment',
          header: t('lastAppointment', 'Last Appointment'),
          getValue: (patient) => {
            return '13/01/2021';
          },
        },
        {
          key: 'appointmentDate',
          header: t('appointmentDate', 'Appointment Date'),
          getValue: (patient) => {
            return '03/03/2021';
          },
        },
      ],
    },
    {
      label: t('todaysAppointments', "Today's Appointments"),
      cohortId: cohorts.todayzAppointmentsCT,
      isReportingCohort: true,
      cohortSlotName: 'ct-todays-appointments',
      launchableForm: {
        package: 'hiv',
        name: 'POC Clinical Visit Form',
        actionText: t('followUpVisit', 'Start Follow Up Visit'),
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
        targetDashboard: 'hts-summary',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location'],
      queryParams: [`value1=${new Date().toISOString().split('T')[0]}`],
      otherColumns: [
        {
          key: 'clientId',
          header: t('clientId', 'Client ID'),
          getValue: (patient) => {
            return patient.id;
          },
          index: 1,
        },
        {
          key: 'lastAppointment',
          header: t('lastAppointment', 'Last Appointment'),
          getValue: (patient) => {
            return '13/01/2021';
          },
        },
        {
          key: 'appointmentDate',
          header: t('appointmentDate', 'Appointment Date'),
          getValue: (patient) => {
            return '03/03/2021';
          },
        },
      ],
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
}

export default CTHomePatientTabs;
