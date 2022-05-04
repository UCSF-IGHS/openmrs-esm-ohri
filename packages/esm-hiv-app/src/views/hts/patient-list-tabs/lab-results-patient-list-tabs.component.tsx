import React from 'react';
import { clientsEnrolledToCare, todayzAppointmentsCT } from '../../../constants';
import { OHRIPatientListTabs } from 'openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';

function LabResultsPatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('cd4LabResults', 'CD4 Lab Results'),
      cohortId: clientsEnrolledToCare,
      isReportingCohort: true,
      cohortSlotName: 'all-ct-clients-slot',
      launchableForm: {
        package: 'hiv',
        name: 'clinical_visit',
        actionText: 'Start Follow Up Visit',
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
        targetDashboard: 'hts-summary',
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
          key: 'cd4Result',
          header: 'Most Recent CD4 Results',
          getValue: patient => {
            return '13/01/2021';
          },
        },
        {
          key: 'cd4ResultDate',
          header: 'CD4 Result Date',
          getValue: patient => {
            return '';
          },
        },
      ],
    },
    {
      label: t('viralLoadResults', 'Viral Load Results'),
      cohortId: todayzAppointmentsCT,
      isReportingCohort: true,
      cohortSlotName: 'ct-todays-appointments',
      launchableForm: {
        package: 'hiv',
        name: 'clinical_visit',
        actionText: 'Start Follow Up Visit',
        intent: 'CT_CLINICAL_VISIT_FOLLOW_UP',
        targetDashboard: 'hts-summary',
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
          key: 'vlResult',
          header: 'Most Recent VL Result',
          getValue: patient => {
            return '13/01/2021';
          },
        },
        {
          key: 'vlResultDate',
          header: 'VL Result Date',
          getValue: patient => {
            return '03/03/2021';
          },
        },
      ],
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} />;
}

export default LabResultsPatientTabs;
