import { findObs, getObsFromEncounter, EncounterTile, EncounterTileColumn } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const headerCharacteristics = t('characteristicsTitle', 'Characteristics');
  const headerHIVMonitoring = t('hivMonitoring', 'HIV Monitoring');
  const headerLastVisitDetails = t('lastVisitDetails', 'Last Visit Details');

  const columnsCharacteristics: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'artCohort',
        header: t('artCohort', 'ART Cohort'),
        encounterUuid: config.encounterTypes.art_Therapy_EncounterUUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            getARTDateConcept(
              encounter,
              config.obsConcepts.artTherapyDateTime_UUID,
              config.obsConcepts.switchDateUUID,
              config.obsConcepts.substitutionDateUUID,
              config.obsConcepts.artStopDateUUID,
              config.obsConcepts.dateRestartedUUID,
            ),
            true,
          );
        },
      },
      {
        key: 'currentRegimen',
        header: t('currentRegimen', 'Current Regimen'),
        encounterUuid: config.encounterTypes.art_Therapy_EncounterUUID,
        hasSummary: true,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.regimen_UUID);
        },
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.regimenLine_UUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('dsdModel', 'DSD Model'),
        encounterUuid: config.encounterTypes.ServiceDeliveryEncounterType_UUID,
        getObsValue: () => {
          return '--';
        },
        hasSummary: true,
        summaryConcept: config.obsConcepts.CommunityDSDModel_UUID,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.CommunityDSDModel_UUID);
        },
      },
      {
        key: 'populationType',
        header: t('populationType', 'Population Type'),
        encounterUuid: config.encounterTypes.careAndTreatmentEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.populationCategoryConcept);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const keyPopulationType = getObsFromEncounter(encounter, config.obsConcepts.keyPopulationTypeConcept);
          if (keyPopulationType !== '--') {
            return keyPopulationType;
          } else {
            return getObsFromEncounter(encounter, config.obsConcepts.priorityPopulationTypeConcept);
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
        encounterUuid: config.encounterTypes.ViralLoadResultsEncounter_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.ViralLoadResult_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.ViralLoadResultDate_UUID, true);
        },
      },
      {
        key: 'currentVLReason',
        header: t('currentVLReason', 'Reason For Current VL'),
        encounterUuid: config.encounterTypes.art_Therapy_EncounterUUID,
        concept: config.obsConcepts.ReasonForViralLoad_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.ReasonForViralLoad_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const viralLoadDate = getObsFromEncounter(encounter, config.obsConcepts.ViralLoadResultDate_UUID, true);
          if (viralLoadDate !== '--') {
            return calculateDateDifferenceInDate(viralLoadDate);
          }
          return '--';
        },
      },
      {
        key: 'lastCD4Count',
        header: t('lastCD4Count', 'Last CD4 Count'),
        encounterUuid: config.encounterTypes.CD4LabResultsEncounter_UUID,
        concept: config.obsConcepts.Cd4Count_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.Cd4Count_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.Cd4LabResultDate_UUID, true);
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
        encounterUuid: config.encounterTypes.clinicalVisitEncounterType,
        concept: config.obsConcepts.tbScreeningOutcome,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.tbScreeningOutcome);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.dateOfEncounterConcept, true);
        },
      },
      {
        key: 'oIs',
        header: t('oIs', 'OIs'),
        encounterUuid: config.encounterTypes.clinicalVisitEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.opportunisticInfectionConcept);
        },
      },
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterUuid: config.encounterTypes.clinicalVisitEncounterType,
        concept: config.obsConcepts.returnVisitDateConcept,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.returnVisitDateConcept, true);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const nextAppointmentDate = getObsFromEncounter(encounter, config.obsConcepts.returnVisitDateConcept, true);
          if (nextAppointmentDate !== '--') {
            return calculateDateDifferenceInDate(nextAppointmentDate);
          }
          return '--';
        },
      },
      {
        key: 'programStatus',
        header: t('programStatus', 'Program Status'),
        encounterUuid: config.encounterTypes.hivProgramStatusEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.generalTreatmentStatusConcept);
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
