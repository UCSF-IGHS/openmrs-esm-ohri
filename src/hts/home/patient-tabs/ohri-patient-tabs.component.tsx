import React from 'react';
import {
  htsRetrospectiveEncounterType,
  postTestCounsellingCohort,
  preTestCounsellingCohort,
  waitingForHIVTestCohort,
} from '../../../constants';
import OHRIPatientListTabs from '../../../components/patient-list-tabs/ohri-patient-list-tabs.component';
import { useTranslation } from 'react-i18next';

function HTSHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('waitingForPreTestCounseling', 'Waiting for pre-test counselling'),
      cohortId: preTestCounsellingCohort,
      cohortSlotName: 'pre-test-counseling-slot',
      associatedEncounterType: htsRetrospectiveEncounterType,
    },
    {
      label: t('waitingForHIVTest', 'Waiting for HIV test'),
      cohortId: waitingForHIVTestCohort,
      cohortSlotName: 'waiting-for-hiv-testing-slot',
    },
    {
      label: t('waitingForPostTestCounseling', 'Waiting for post-test counselling'),
      cohortId: postTestCounsellingCohort,
      cohortSlotName: 'post-test-counseling-slot',
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} />;
}

export default HTSHomePatientTabs;
