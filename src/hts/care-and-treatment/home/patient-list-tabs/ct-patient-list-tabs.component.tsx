import React from 'react';
import { clientsEnrolledToCare, todayzAppointmentsCT } from '../../../../constants';
import OHRIPatientListTabs from '../../../../components/patient-list-tabs/ohri-patient-list-tabs.component';
import { useTranslation } from 'react-i18next';

function CTHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('allCTClients', 'All C&T Clients'),
      cohortId: clientsEnrolledToCare,
      isReportingCohort: true,
      cohortSlotName: 'all-ct-clients-slot',
      launchableForm: {
        package: 'hiv',
        name: 'clinical_visit',
        actionText: 'Start Follow Up Visit',
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location'],
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
      label: t('todaysAppointments', "Today's Appointments"),
      cohortId: todayzAppointmentsCT,
      isReportingCohort: true,
      cohortSlotName: 'ct-todays-appointments',
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
