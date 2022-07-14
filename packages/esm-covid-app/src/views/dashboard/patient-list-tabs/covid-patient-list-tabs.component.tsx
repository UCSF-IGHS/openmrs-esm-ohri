import React from 'react';
import {
  clientsAssessedForCovid,
  clientsWithoutCovidOutcomes,
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
  finalCovid19Result,
  pcrTestResult,
  pcrTestResultDate,
  rapidAntigenResultDate,
  rapidTestResult,
} from '../../../constants';
import { useTranslation } from 'react-i18next';
import {
  findObs,
  getObsFromEncounter,
  getObsFromEncounters,
  OHRIPatientListTabs,
  returnVisitDateConcept,
} from 'openmrs-esm-ohri-commons-lib';
import moment from 'moment';

function CovidHomePatientTabs() {
  const { t } = useTranslation();

  const tabsConfigs = [
    {
      label: t('allCTClients', 'All COVID-19 Clients'),
      cohortId: clientsAssessedForCovid,
      isReportingCohort: true,
      cohortSlotName: 'clients-assessed-for-covid-slot',
      launchableForm: {
        package: 'covid',
        name: 'covid_assessment',
        editActionText: 'Edit case assessment form',
        editLatestEncounter: true,
        targetDashboard: 'covid-assessments',
      },
      associatedEncounterType: covidCaseAssessmentEncType,
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      otherColumns: [
        {
          key: 'assessmentDate',
          header: 'Assessment date',
          getValue: ({ latestEncounter }) => {
            return latestEncounter && moment(latestEncounter.encounterDatetime).format('DD-MMM-YYYY');
          },
          index: 3,
        },
        {
          key: 'finalAssessment',
          header: 'Final result',
          getValue: ({ latestExtraEncounters }) => {
            const pcrResult = getObsFromEncounters(latestExtraEncounters, pcrTestResult);
            return pcrResult && pcrResult != '--'
              ? pcrResult
              : getObsFromEncounters(latestExtraEncounters, rapidTestResult);
          },
        },
        {
          key: 'outcome',
          header: 'Outcome',
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
        package: 'covid',
        name: 'covid_lab_test',
        editActionText: 'Enter test result',
        editLatestEncounter: true,
        targetDashboard: 'covid-lab-results',
      },
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      associatedEncounterType: covidCaseAssessmentEncType,
      otherColumns: [
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
      label: t('scheduledVaccination', 'Scheduled Vaccination'),
      cohortId: covidVaccinatedClients,
      isReportingCohort: true,
      cohortSlotName: 'clients-vaccinated-for-covid-slot',
      launchableForm: {
        package: 'covid',
        name: 'covid_vaccination',
        editActionText: 'Edit covid vaccination form',
        editLatestEncounter: true,
        targetDashboard: 'covid_vaccination',
      },
      associatedEncounterType: covidVaccinationEncType,
      excludeColumns: ['timeAddedToList', 'waitingTime', 'location', 'phoneNumber', 'hivResult'],
      otherColumns: [
        {
          key: 'lastDoseAdministered',
          header: 'Last Dose Administered',
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, covidVaccinationDose_UUID);
          },
        },
        {
          key: 'vaccine',
          header: 'Vaccine',
          getValue: ({ latestEncounter }) => {
            const obs = findObs(latestEncounter, covidVaccineAdministeredConcept_UUID);
            if (typeof obs !== undefined && obs) {
              if (typeof obs.value === 'object') {
                const vaccineNAME =
                  obs.value.names?.find(conceptName => conceptName.conceptNameType === 'SHORT')?.name ||
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
          header: 'Return Visit Date',
          getValue: ({ latestEncounter }) => {
            return getObsFromEncounter(latestEncounter, returnVisitDateConcept, true);
          },
        },
      ],
    },
  ];
  return <OHRIPatientListTabs patientListConfigs={tabsConfigs} />;
}

export default CovidHomePatientTabs;
