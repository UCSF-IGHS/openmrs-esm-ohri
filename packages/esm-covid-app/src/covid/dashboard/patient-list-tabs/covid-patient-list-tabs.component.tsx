import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  findObs,
  getObsFromEncounter,
  getObsFromEncounters,
  OHRIPatientListTabs,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';
import dayjs from 'dayjs';

function CovidHomePatientTabs() {
  const { t } = useTranslation();
  const config = useConfig();

  const tabsConfigs = useMemo(
    () => [
      {
        label: t('allCTClients', 'All COVID-19 Clients'),
        cohortId: config.cohorts.clientsAssessedForCovid,
        isReportingCohort: true,
        cohortSlotName: 'clients-assessed-for-covid-slot',
        launchableForm: {
          editActionText: t('editAssessmentForm', 'Edit case assessment form'),
          editLatestEncounter: true,
          targetDashboard: 'covid-assessments',
          name: 'COVID Assessment Form',
        },
        associatedEncounterType: config.obsConcepts.covidCaseAssessmentEncType,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'assessmentDate',
            header: t('assessmentDate', 'Assessment date'),
            getValue: ({ latestEncounter }) => {
              return latestEncounter && dayjs(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
            },
            index: 3,
          },
          {
            key: 'finalAssessment',
            header: t('finalResults', 'Final result'),
            getValue: ({ latestExtraEncounters }) => {
              const pcrResult = getObsFromEncounters(latestExtraEncounters, config.obsConcepts.pcrTestResult);
              return pcrResult && pcrResult != '--'
                ? pcrResult
                : getObsFromEncounters(latestExtraEncounters, config.obsConcepts.rapidTestResult);
            },
          },
          {
            key: 'outcome',
            header: t('outcome', 'Outcome'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.covidOutcome);
            },
          },
        ],
        extraAssociatedEncounterTypes: [config.obsConcepts.covidLabTestEncType],
      },
      {
        label: t('pendingLabResults', 'Pending lab results'),
        cohortId: config.cohorts.covidClientsWithPendingLabResults,
        isReportingCohort: true,
        cohortSlotName: 'pending-covid-lab-results-slot',
        launchableForm: {
          name: 'COVID Lab Test',
          editActionText: 'Enter test result',
          editLatestEncounter: true,
          targetDashboard: 'covid-lab-results',
        },
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        associatedEncounterType: config.obsConcepts.covidCaseAssessmentEncType,
        otherColumns: [
          {
            key: 'testDate',
            header: t('testDate', 'Test Date'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.dateSpecimenCollected, true);
            },
          },
          {
            key: 'testType',
            header: t('testType', 'Test Type'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.covidTestType);
            },
          },
        ],
      },
      {
        label: t('scheduledVaccination', 'Scheduled Vaccination'),
        cohortId: config.obsConcepts.covidVaccinatedClients,
        isReportingCohort: true,
        cohortSlotName: 'clients-vaccinated-for-covid-slot',
        launchableForm: {
          name: 'COVID Vaccination Form',
          editActionText: 'Edit covid vaccination form',
          editLatestEncounter: true,
          targetDashboard: 'covid_vaccination',
        },
        associatedEncounterType: config.obsConcepts.covidVaccinationEncType,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'lastDoseAdministered',
            header: t('lastDoseAdministered', 'Last Dose Administered'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.covidVaccinationDose_UUID);
            },
          },
          {
            key: 'vaccine',
            header: t('vaccine', 'Vaccine'),
            getValue: ({ latestEncounter }) => {
              const obs = findObs(latestEncounter, config.obsConcepts.covidVaccineAdministeredConcept_UUID);
              if (typeof obs !== 'undefined' && obs) {
                if (typeof obs.value === 'object') {
                  const vaccineNAME =
                    obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
                    obs.value.name.name;
                  if (vaccineNAME === 'Other non-coded') {
                    return getObsFromEncounter(latestEncounter, config.obsConcepts.covidVaccineConcept_UUID);
                  }
                }
              }
              return getObsFromEncounter(latestEncounter, config.obsConcepts.covidVaccineAdministeredConcept_UUID);
            },
          },
          {
            key: 'returnVisitDate',
            header: t('returnVisitDate', 'Return Visit Date'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, config.obsConcepts.returnVisitDateConcept, true);
            },
          },
        ],
      },
    ],
    [
      config.cohorts.clientsAssessedForCovid,
      config.cohorts.covidClientsWithPendingLabResults,
      config.obsConcepts.covidCaseAssessmentEncType,
      config.obsConcepts.covidLabTestEncType,
      config.obsConcepts.covidOutcome,
      config.obsConcepts.covidTestType,
      config.obsConcepts.covidVaccinatedClients,
      config.obsConcepts.covidVaccinationDose_UUID,
      config.obsConcepts.covidVaccinationEncType,
      config.obsConcepts.covidVaccineAdministeredConcept_UUID,
      config.obsConcepts.covidVaccineConcept_UUID,
      config.obsConcepts.dateSpecimenCollected,
      config.obsConcepts.pcrTestResult,
      config.obsConcepts.rapidTestResult,
      config.obsConcepts.returnVisitDateConcept,
      t,
    ],
  );
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
}

export default CovidHomePatientTabs;
