import React, { useMemo } from 'react';
import {
  clientsAssessedForCovid,
  covidCaseAssessmentEncType,
  covidClientsWithPendingLabResults,
  covidLabTestEncType,
  covidOutcome,
  covidTestType,
  covidVaccinatedClients,
  covidVaccinationDose_UUID,
  covidVaccinationEncType,
  covidVaccineAdministeredConcept_UUID,
  covidVaccineConcept_UUID,
  dateSpecimenCollected,
  pcrTestResult,
  rapidTestResult,
} from '../../../constants';
import { useTranslation } from 'react-i18next';
import {
  findObs,
  getObsFromEncounter,
  getObsFromEncounters,
  OHRIPatientListTabs,
  returnVisitDateConcept,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import moment from 'moment';
import { moduleName } from '../../../index';

function CovidHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = useMemo(
    () => [
      {
        label: t('allCTClients', 'All COVID-19 Clients'),
        cohortId: clientsAssessedForCovid,
        isReportingCohort: true,
        cohortSlotName: 'clients-assessed-for-covid-slot',
        launchableForm: {
          editActionText: t('editAssessmentForm', 'Edit case assessment form'),
          editLatestEncounter: true,
          targetDashboard: 'covid-assessments',
          name: 'COVID Assessment Form',
        },
        associatedEncounterType: covidCaseAssessmentEncType,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'assessmentDate',
            header: t('assessmentDate', 'Assessment date'),
            getValue: ({ latestEncounter }) => {
              return latestEncounter && moment(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
            },
            index: 3,
          },
          {
            key: 'finalAssessment',
            header: t('finalResults', 'Final result'),
            getValue: ({ latestExtraEncounters }) => {
              const pcrResult = getObsFromEncounters(latestExtraEncounters, pcrTestResult);
              return pcrResult && pcrResult != '--'
                ? pcrResult
                : getObsFromEncounters(latestExtraEncounters, rapidTestResult);
            },
          },
          {
            key: 'outcome',
            header: t('outcome', 'Outcome'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, covidOutcome);
            },
          },
        ],
        extraAssociatedEncounterTypes: [covidLabTestEncType],
      },
      {
        label: t('pendingLabResults', 'Pending lab results'),
        cohortId: covidClientsWithPendingLabResults,
        isReportingCohort: true,
        cohortSlotName: 'pending-covid-lab-results-slot',
        launchableForm: {
          name: 'COVID Lab Test',
          editActionText: 'Enter test result',
          editLatestEncounter: true,
          targetDashboard: 'covid-lab-results',
        },
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        associatedEncounterType: covidCaseAssessmentEncType,
        otherColumns: [
          {
            key: 'testDate',
            header: t('testDate', 'Test Date'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, dateSpecimenCollected, true);
            },
          },
          {
            key: 'testType',
            header: t('testType', 'Test Type'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, covidTestType);
            },
          },
        ],
      },
      {
        label: t('scheduledVaccination', 'Scheduled Vaccination'),
        cohortId: covidVaccinatedClients,
        isReportingCohort: true,
        cohortSlotName: 'clients-vaccinated-for-covid-slot',
        launchableForm: {
          name: 'COVID Vaccination Form',
          editActionText: 'Edit covid vaccination form',
          editLatestEncounter: true,
          targetDashboard: 'covid_vaccination',
        },
        associatedEncounterType: covidVaccinationEncType,
        excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
        otherColumns: [
          {
            key: 'lastDoseAdministered',
            header: t('lastDoseAdministered', 'Last Dose Administered'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, covidVaccinationDose_UUID);
            },
          },
          {
            key: 'vaccine',
            header: t('vaccine', 'Vaccine'),
            getValue: ({ latestEncounter }) => {
              const obs = findObs(latestEncounter, covidVaccineAdministeredConcept_UUID);
              if (typeof obs !== undefined && obs) {
                if (typeof obs.value === 'object') {
                  const vaccineNAME =
                    obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
                    obs.value.name.name;
                  if (vaccineNAME === 'Other non-coded') {
                    return getObsFromEncounter(latestEncounter, covidVaccineConcept_UUID);
                  }
                }
              }
              return getObsFromEncounter(latestEncounter, covidVaccineAdministeredConcept_UUID);
            },
          },
          {
            key: 'returnVisitDate',
            header: t('returnVisitDate', 'Return Visit Date'),
            getValue: ({ latestEncounter }) => {
              return getObsFromEncounter(latestEncounter, returnVisitDateConcept, true);
            },
          },
        ],
      },
    ],
    [],
  );
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} moduleName={moduleName} />;
}

export default CovidHomePatientTabs;
