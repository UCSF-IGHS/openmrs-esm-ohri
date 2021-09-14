import React from 'react';
import { postTestCounsellingCohort, preTestCounsellingCohort, waitingForHIVTestCohort } from '../../../../constants';
import OHRIPatientListTabs from '../../../../components/patient-list-tabs/ohri-patient-list-tabs.component';
import { useTranslation } from 'react-i18next';

function CTHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('allCTClients', 'All C&T Clients'),
      cohortId: preTestCounsellingCohort,
      cohortSlotName: 'all-ct-clients-slot',
    },
    {
      label: t('todaysAppointments', "Today's Appointments"),
      cohortId: postTestCounsellingCohort,
      cohortSlotName: 'ct-todays-appointments',
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} />;
}

export default CTHomePatientTabs;
