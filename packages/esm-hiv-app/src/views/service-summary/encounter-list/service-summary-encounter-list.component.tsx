import { findObs, getObsFromEncounter, EncounterTile, EncounterTileColumn } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes } = useConfig();

  const headerCharacteristics = t('characteristicsTitle', 'Characteristics');
  const headerHIVMonitoring = t('hivMonitoring', 'HIV Monitoring');
  const headerLastVisitDetails = t('lastVisitDetails', 'Last Visit Details');

  const columnsCharacteristics: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'artCohort',
        header: t('artCohort', 'ART Cohort'),
        encounterUuid: encounterTypes.art_Therapy_EncounterUUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            getARTDateConcept(
              encounter,
              obsConcepts.artTherapyDateTime_UUID,
              obsConcepts.switchDateUUID,
              obsConcepts.substitutionDateUUID,
              obsConcepts.artStopDateUUID,
              obsConcepts.dateRestartedUUID,
            ),
            true,
          );
        },
      },
      {
        key: 'currentRegimen',
        header: t('currentRegimen', 'Current Regimen'),
        encounterUuid: encounterTypes.art_Therapy_EncounterUUID,
        hasSummary: true,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.regimen_UUID);
        },
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.regimenLine_UUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('dsdModel', 'DSD Model'),
        encounterUuid: encounterTypes.ServiceDeliveryEncounterType_UUID,
        getObsValue: () => {
          return '--';
        },
        hasSummary: true,
        summaryConcept: obsConcepts.CommunityDSDModel_UUID,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.CommunityDSDModel_UUID);
        },
      },
      {
        key: 'populationType',
        header: t('populationType', 'Population Type'),
        encounterUuid: encounterTypes.careAndTreatmentEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.populationCategoryConcept);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const keyPopulationType = getObsFromEncounter(encounter, obsConcepts.keyPopulationTypeConcept);
          if (keyPopulationType !== '--') {
            return keyPopulationType;
          } else {
            return getObsFromEncounter(encounter, obsConcepts.priorityPopulationTypeConcept);
          }
        },
      },
    ],
    [],
  );

  const columnsHIVMonitoring: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'viralLoad',
        header: t('currentViralLoad', 'Current Viral Load'),
        encounterUuid: encounterTypes.ViralLoadResultsEncounter_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ViralLoadResult_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ViralLoadResultDate_UUID, true);
        },
      },
      {
        key: 'currentVLReason',
        header: t('currentVLReason', 'Reason For Current VL'),
        encounterUuid: encounterTypes.art_Therapy_EncounterUUID,
        concept: obsConcepts.ReasonForViralLoad_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ReasonForViralLoad_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const viralLoadDate = getObsFromEncounter(encounter, obsConcepts.ViralLoadResultDate_UUID, true);
          if (viralLoadDate !== '--') {
            return calculateDateDifferenceInDate(viralLoadDate);
          }
          return '--';
        },
      },
      {
        key: 'lastCD4Count',
        header: t('lastCD4Count', 'Last CD4 Count'),
        encounterUuid: encounterTypes.CD4LabResultsEncounter_UUID,
        concept: obsConcepts.Cd4Count_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.Cd4Count_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.Cd4LabResultDate_UUID, true);
        },
      },
    ],
    [],
  );

  const columnsLastVisitDetails: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'tbScreening',
        header: t('tbScreening', 'TB Screening'),
        encounterUuid: encounterTypes.clinicalVisitEncounterType,
        concept: obsConcepts.tbScreeningOutcome,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tbScreeningOutcome);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.dateOfEncounterConcept, true);
        },
      },
      {
        key: 'oIs',
        header: t('oIs', 'OIs'),
        encounterUuid: encounterTypes.clinicalVisitEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.opportunisticInfectionConcept);
        },
      },
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterUuid: encounterTypes.clinicalVisitEncounterType,
        concept: obsConcepts.returnVisitDateConcept,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.returnVisitDateConcept, true);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const nextAppointmentDate = getObsFromEncounter(encounter, obsConcepts.returnVisitDateConcept, true);
          if (nextAppointmentDate !== '--') {
            return calculateDateDifferenceInDate(nextAppointmentDate);
          }
          return '--';
        },
      },
      {
        key: 'programStatus',
        header: t('programStatus', 'Program Status'),
        encounterUuid: encounterTypes.hivProgramStatusEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.generalTreatmentStatusConcept);
        },
      },
    ],
    [],
  );

  const calculateDateDifferenceInDate = (givenDate: string): string => {
    const dateDifference = new Date().getTime() - new Date(givenDate).getTime();
    const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
    return `${totalDays} days`;
  };

  const getARTDateConcept = (encounter, startDate, switchDate, substitutionDate, stopDate, restartDate): string => {
    let artStartDate = findObs(encounter, startDate);
    let artSwitchDate = findObs(encounter, switchDate);
    let artSubstitutionDate = findObs(encounter, substitutionDate);
    let artStopDate = findObs(encounter, stopDate);
    let artRestartDate = findObs(encounter, restartDate);

    artStartDate = artStartDate ? artStartDate.value : null;
    artSubstitutionDate = artSubstitutionDate ? artSubstitutionDate.value : null;
    artSwitchDate = artSwitchDate ? artSwitchDate.value : null;
    artStopDate = artStopDate ? artStopDate.value : null;
    artRestartDate = artRestartDate ? artRestartDate.value : null;

    let latestDateConcept: string = startDate;
    let latestDate = artStartDate;
    if (artSubstitutionDate != null) {
      latestDateConcept = substitutionDate;
      latestDate = artSubstitutionDate;
    }
    if (artSwitchDate != null) {
      latestDate = artSwitchDate;
      latestDateConcept = switchDate;
    }
    if (artStopDate != null) {
      latestDate = artStopDate;
      latestDateConcept = stopDate;
    }
    if (artRestartDate != null) {
      latestDate = artRestartDate;
      latestDateConcept = restartDate;
    }

    return latestDateConcept;
  };
  return (
    <>
      <EncounterTile patientUuid={patientUuid} columns={columnsCharacteristics} headerTitle={headerCharacteristics} />
      <EncounterTile patientUuid={patientUuid} columns={columnsHIVMonitoring} headerTitle={headerHIVMonitoring} />
      <EncounterTile patientUuid={patientUuid} columns={columnsLastVisitDetails} headerTitle={headerLastVisitDetails} />
    </>
  );
};

export default ServiceSummaryOverviewList;
