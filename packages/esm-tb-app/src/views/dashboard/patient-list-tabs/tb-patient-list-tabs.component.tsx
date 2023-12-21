import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getObsFromEncounter, OHRIPatientListTabs } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

function TbHomePatientTabs() {
  const { t } = useTranslation();
  const config = useConfig();

  const tabsConfigs = useMemo(
    () => [
      {
        label: t('allTbClients', 'All TB Clients'),
        cohortId: config.cohorts.clientsEnrolledForTb,
        isReportingCohort: true,
        cohortSlotName: 'clients-assessed-for-covid-tb',
        launchableForm: {
          editActionText: t('editFollowUpForm', 'Edit TB Follow-up Form'),
          editLatestEncounter: true,
          targetDashboard: 'tb-assessments',
          name: 'TB Follow-up Form',
        },
        associatedEncounterType: config.encounterTypes.tbProgramEnrollment,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'caseID',
            header: t('caseID', 'Case ID'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.caseID);
            },
            index: 1,
          },
          {
            key: 'drugSensitivity',
            header: t('drugSensitivity', 'Drug Sensitivity'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.drugSensitivity);
            },
          },
          {
            key: 'site',
            header: t('siteOfTb,', 'Site of TB'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.site);
            },
          },
          {
            key: 'nextAppointmentDate',
            header: t('appointmentDate', 'Appointment Date'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.nextAppointmentDate, true);
            },
          },
          {
            key: 'outcome',
            header: t('outcome', 'Outcome'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.outcome);
            },
          },
        ],
        viewPatientProgramSummary: true,
      },
    ],
    [],
  );
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
}

export default TbHomePatientTabs;
