import React, { useMemo } from 'react';
import {
  tbCaseEnrollmentEncType,
  caseId,
  drugSensitivity,
  typeOfTb,
  tbOutcome,
  clientsEnrolledForTb,

} from '../../../constants';
import { useTranslation } from 'react-i18next';
import {
  getObsFromEncounter,
  OHRIPatientListTabs,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import moment from 'moment';
import { moduleName } from '../../../index';

function TbHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = useMemo(
    () => [
      {
        label: t('allTbClients', 'All TB Clients'),
        cohortId: clientsEnrolledForTb,
        isReportingCohort: true,
        cohortSlotName: 'clients-assessed-for-covid-tb',
        launchableForm: {
          editActionText: t('editAssessmentForm', 'Edit TB case assessment form'),
          editLatestEncounter: true,
          targetDashboard: 'tb-assessments',
          name: 'TB Case Enrollment Form',
        },
        associatedEncounterType: tbCaseEnrollmentEncType,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'caseId',
            header: t('caseId', 'Case ID'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, caseId);
            },
            index: 1,
          },
          {
            key: 'drugSensitivity',
            header: t('drugSensitivity', 'Drug Sensitivity'),
            getValue: ({ latestEncounter }) => {              
              return getObsFromEncounter(latestEncounter, drugSensitivity);
            },
          },
          {
            key: 'typeTb',
            header: t('typeTB', 'Type of TB'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, typeOfTb);
            },
          },
          {
            key: 'appointmentDate',
            header: t('appointmentDate', 'Appointment Date'),
            getValue: ({ latestEncounter }) => {
              return latestEncounter && moment(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
            },
          },
          {
            key: 'outcome',
            header: t('outcome', 'Outcome'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, tbOutcome);
            },
          },
        ],
      },
    ],
    [],
  );
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
}

export default TbHomePatientTabs;
