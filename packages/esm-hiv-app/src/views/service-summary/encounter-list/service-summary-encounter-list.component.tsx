import { findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterTile,
  EncounterTileColumn,
} from '../../../../../esm-commons-lib/src/components/encounter-tile/encounter-tile.component';

import {
  artStopDateUUID,
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  careAndTreatmentEncounterType,
  Cd4Count_UUID,
  Cd4LabResultDate_UUID,
  CD4LabResultsEncounter_UUID,
  clinicalVisitEncounterType,
  CommunityDSDModel_UUID,
  dateOfEncounterConcept,
  dateRestartedUUID,
  generalTreatmentStatusConcept,
  hivProgramStatusEncounterType,
  keyPopulationTypeConcept,
  opportunisticInfectionConcept,
  populationCategoryConcept,
  priorityPopulationTypeConcept,
  ReasonForViralLoad_UUID,
  regimenLine_UUID,
  regimen_UUID,
  returnVisitDateConcept,
  ServiceDeliveryEncounterType_UUID,
  substitutionDateUUID,
  switchDateUUID,
  tbScreeningOutcome,
  ViralLoadResultDate_UUID,
  ViralLoadResultsEncounter_UUID,
  ViralLoadResult_UUID,
} from '../../../constants';
interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerCharacteristics = t('characteristicsTitle', 'Characteristics');
  const headerHIVMonitoring = t('hivMonitoring', 'HIV Monitoring');
  const headerLastVisitDetails = t('lastVisitDetails', 'Last Visit Details');

  const columnsCharacteristics: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'artCohort',
        header: t('artCohort', 'ART Cohort'),
        encounterUuid: art_Therapy_EncounterUUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            getARTDateConcept(
              encounter,
              artTherapyDateTime_UUID,
              switchDateUUID,
              substitutionDateUUID,
              artStopDateUUID,
              dateRestartedUUID,
            ),
            true,
          );
        },
      },
      {
        key: 'currentRegimen',
        header: t('currentRegimen', 'Current Regimen'),
        encounterUuid: art_Therapy_EncounterUUID,
        hasSummary: true,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, regimen_UUID);
        },
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, regimenLine_UUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('dsdModel', 'DSD Model'),
        encounterUuid: ServiceDeliveryEncounterType_UUID,
        getObsValue: () => {
          return '--';
        },
        hasSummary: true,
        summaryConcept: CommunityDSDModel_UUID,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, CommunityDSDModel_UUID);
        },
      },
      {
        key: 'populationType',
        header: t('populationType', 'Population Type'),
        encounterUuid: careAndTreatmentEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, populationCategoryConcept);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const keyPopulationType = getObsFromEncounter(encounter, keyPopulationTypeConcept);
          if (keyPopulationType !== '--') {
            return keyPopulationType;
          } else {
            return getObsFromEncounter(encounter, priorityPopulationTypeConcept);
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
        encounterUuid: ViralLoadResultsEncounter_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, ViralLoadResult_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, ViralLoadResultDate_UUID, true);
        },
      },
      {
        key: 'currentVLReason',
        header: t('currentVLReason', 'Reason For Current VL'),
        encounterUuid: art_Therapy_EncounterUUID,
        concept: ReasonForViralLoad_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, ReasonForViralLoad_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const viralLoadDate = getObsFromEncounter(encounter, ViralLoadResultDate_UUID, true);
          if (viralLoadDate !== '--') {
            return calculateDateDifferenceInDate(viralLoadDate);
          }
          return '--';
        },
      },
      {
        key: 'lastCD4Count',
        header: t('lastCD4Count', 'Last CD4 Count'),
        encounterUuid: CD4LabResultsEncounter_UUID,
        concept: Cd4Count_UUID,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, Cd4Count_UUID);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, Cd4LabResultDate_UUID, true);
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
        encounterUuid: clinicalVisitEncounterType,
        concept: tbScreeningOutcome,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, tbScreeningOutcome);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          return getObsFromEncounter(encounter, dateOfEncounterConcept, true);
        },
      },
      {
        key: 'oIs',
        header: t('oIs', 'OIs'),
        encounterUuid: clinicalVisitEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, opportunisticInfectionConcept);
        },
      },
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterUuid: clinicalVisitEncounterType,
        concept: returnVisitDateConcept,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, returnVisitDateConcept, true);
        },
        hasSummary: true,
        getSummaryObsValue: (encounter) => {
          const nextAppointmentDate = getObsFromEncounter(encounter, returnVisitDateConcept, true);
          if (nextAppointmentDate !== '--') {
            return calculateDateDifferenceInDate(nextAppointmentDate);
          }
          return '--';
        },
      },
      {
        key: 'programStatus',
        header: t('programStatus', 'Program Status'),
        encounterUuid: hivProgramStatusEncounterType,
        getObsValue: (encounter) => {
          return getObsFromEncounter(encounter, generalTreatmentStatusConcept);
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
