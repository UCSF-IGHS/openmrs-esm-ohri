import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterTile,
  EncounterTileColumn,
} from '../../../../../esm-commons-lib/src/components/encounter-tile/encounter-tile.component';

import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  careAndTreatmentEncounterType,
  Cd4Count_UUID,
  Cd4LabResultDate_UUID,
  CD4LabResultsEncounter_UUID,
  clinicalVisitEncounterType,
  CommunityDSDModel_UUID,
  dateOfEncounterConcept,
  generalTreatmentStatusConcept,
  hivProgramStatusEncounterType,
  opportunisticInfectionConcept,
  populationCategoryConcept,
  ReasonForViralLoad_UUID,
  regimenLine_UUID,
  regimen_UUID,
  returnVisitDateConcept,
  ServiceDeliveryEncounterType_UUID,
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
        isConceptDate: true,
        concept: artTherapyDateTime_UUID,
        isARTDateConcept: true,
      },
      {
        key: 'currentRegimen',
        header: t('currentRegimen', 'Current Regimen'),
        encounterUuid: art_Therapy_EncounterUUID,
        concept: regimen_UUID,
        summaryConcept: regimenLine_UUID,
      },
      {
        key: 'dsdModel',
        header: t('dsdModel', 'DSD Model'),
        encounterUuid: ServiceDeliveryEncounterType_UUID,
        concept: '',
        summaryConcept: CommunityDSDModel_UUID,
      },
      {
        key: 'populationType',
        header: t('populationType', 'Population Type'),
        encounterUuid: careAndTreatmentEncounterType,
        concept: populationCategoryConcept,
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
        concept: ViralLoadResult_UUID,
        summaryConcept: ViralLoadResultDate_UUID,
        isConceptSummaryDate: true,
      },
      {
        key: 'currentVLReason',
        header: t('currentVLReason', 'Reason For Current VL'),
        encounterUuid: art_Therapy_EncounterUUID,
        concept: ReasonForViralLoad_UUID,
        summaryConcept: ViralLoadResultDate_UUID,
        isConceptSummaryDate: true,
        isSummaryDaysCalculation: true,
      },
      {
        key: 'lastCD4Count',
        header: t('lastCD4Count', 'Last CD4 Count'),
        encounterUuid: CD4LabResultsEncounter_UUID,
        concept: Cd4Count_UUID,
        summaryConcept: Cd4LabResultDate_UUID,
        isConceptSummaryDate: true,
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
        summaryConcept: dateOfEncounterConcept,
        isConceptSummaryDate: true,
      },
      {
        key: 'oIs',
        header: t('oIs', 'OIs'),
        encounterUuid: clinicalVisitEncounterType,
        concept: opportunisticInfectionConcept,
      },
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        encounterUuid: clinicalVisitEncounterType,
        concept: returnVisitDateConcept,
        isConceptDate: true,
        summaryConcept: returnVisitDateConcept,
        isSummaryDaysCalculation: true,
        isConceptSummaryDate: true,
      },
      {
        key: 'programStatus',
        header: t('programStatus', 'Program Status'),
        encounterUuid: hivProgramStatusEncounterType,
        concept: generalTreatmentStatusConcept,
      },
    ],
    [],
  );

  return (
    <>
      <EncounterTile patientUuid={patientUuid} columns={columnsCharacteristics} headerTitle={headerCharacteristics} />
      <EncounterTile patientUuid={patientUuid} columns={columnsHIVMonitoring} headerTitle={headerHIVMonitoring} />
      <EncounterTile patientUuid={patientUuid} columns={columnsLastVisitDetails} headerTitle={headerLastVisitDetails} />
    </>
  );
};

export default ServiceSummaryOverviewList;
