import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterTile,
  EncounterTileColumn,
  findObs,
  getEncounterValues,
  getObsFromEncounter,
} from '../../../../../esm-commons-lib/src/components/encounter-tile/encounter-tile.component';

import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  careAndTreatmentEncounterType,
  Cd4Count_UUID,
  Cd4LabResultDate_UUID,
  dateOfARTInitiation,
  enrolmentDate,
  hivCD4Count_UUID,
  populationCategoryConcept,
  regimen_UUID,
  ServiceDeliveryEncounterType_UUID,
  ViralLoadResultDate_UUID,
  ViralLoadResult_UUID,
} from '../../../constants';
interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerCharacteristics = t('characteristicsTitle', 'Characteristics');
  const displayCharacteristics = t('characteristicsDisplay', 'Characteristics');

  const headerARvRegiment = t('currentARVTitle', 'Current ARV Regimen');
  const displayARvRegiment = t('currentARVDisplay', 'Current ARV Regimen');

  const columnsCharacteristics: EncounterTileColumn[] = useMemo(
    () => [
      {
        key: 'artCohort',
        header: t('artCohort', 'ART Cohort'),
        encounterUuid: art_Therapy_EncounterUUID,
        getValue: ({ latestEncounter }) => {
          return getObsFromEncounter(latestEncounter, artTherapyDateTime_UUID, true);
        },
      },
      {
        key: 'currentRegimen',
        header: t('currentRegimen', 'Current Regimen'),
        encounterUuid: art_Therapy_EncounterUUID,
        getValue: ({ latestEncounter }) => {
          return getObsFromEncounter(latestEncounter, regimen_UUID);
        },
      },
      {
        key: 'dsdModel',
        header: t('dsdModel', 'DSD Model'),
        encounterUuid: ServiceDeliveryEncounterType_UUID,
        getValue: ({ latestEncounter }) => {
          return '';
        },
      },
      {
        key: 'populationType',
        header: t('populationType', 'Population Type'),
        encounterUuid: art_Therapy_EncounterUUID,
        getValue: ({ latestEncounter }) => {
          return getObsFromEncounter(latestEncounter, populationCategoryConcept);
        },
      },
    ],
    [],
  );

  // const columnsARV: EncounterTileColumn[] = useMemo(
  //   () => [
  //     {
  //       key: 'regimen',
  //       header: t('arvRegimen', 'Current ARV regimen'),
  //       getValue: ({ latestEncounter }) => {
  //         return getObsFromEncounter(latestEncounter, ViralLoadResultDate_UUID, true);
  //       },
  //     },
  //     {
  //       key: 'lastCD4Count',
  //       header: t('drugAllergies', 'Drug Allergies'),
  //       getValue: ({ latestEncounter }) => {
  //         return getObsFromEncounter(latestEncounter, hivCD4Count_UUID);
  //       },
  //     },
  //     {
  //       key: 'eacSession',
  //       header: t('EAC', 'EAC Session'),
  //       getValue: ({ latestEncounter }) => {
  //         return getObsFromEncounter(latestEncounter, Cd4LabResultDate_UUID, true);
  //       },
  //     },
  //     {
  //       key: 'currentARV',
  //       header: 'ARV Initiation Date',
  //       getValue: (latestEncounter) => {
  //         return getObsFromEncounter(latestEncounter, artTherapyDateTime_UUID, true);
  //       },
  //     },
  //   ],
  //   [],
  // );
  // const mockData_Characteristics = useMemo(
  //   () => [
  //     { field: t('artCohort', 'ART Cohort'), value: '02/2022', summary: '' },
  //     {
  //       field: t('currentRegimen', 'Current Regimen'),
  //       value: 'AZT/3TC/NVP',
  //       summary: 'Adult second line 3rd line 4th line paka paka',
  //     },
  //     { field: t('dsdModel', 'Enrolled in care'), value: '.', summary: 'Express Care(Fast Track Drug Refill)' },
  //     { field: t('populationType', 'Population Type'), value: 'Key Population', summary: 'AGSW AGYT  JEJEKE' },
  //   ],
  //   [],
  // );
  // const mockData_HIV_Monitoring = useMemo(
  //   () => [
  //     { field: t('currentViralLoad', 'Current Viral Load'), value: 'Not Detected' },
  //     { field: t('reasonForCurrentVL', 'Reason For Current VL'), value: 'Routine Viral Load' },
  //     { field: t('lastCD4Count', 'Last CD4 Count'), value: '200' },
  //   ],
  //   [],
  // );

  // const mockData_Last_Visit = useMemo(
  //   () => [
  //     { field: t('tbScreening', 'TB Screening'), value: 'Negative' },
  //     { field: t('OIs', 'OIs'), value: 'Current OI' },
  //     { field: t('nextAppointmentDate', 'Next Appointment Date'), value: '01/12/2022' },
  //     { field: t('programStatus', 'Program Status'), value: 'Transfer-Out' },
  //   ],
  //   [],
  // );

  return (
    <>
      <EncounterTile
        encounterUuid={art_Therapy_EncounterUUID}
        patientUuid={patientUuid}
        columns={columnsCharacteristics}
        description={displayCharacteristics}
        headerTitle={headerCharacteristics}
        tileStyle=""
      />

      {/* <EncounterTile
        mockData={mockData_HIV_Monitoring}
        patientUuid={patientUuid}
        columns={columnsARV}
        description={headerARvRegiment}
        headerTitle="HIV Monitoring"
        dropdownText="Change "
        tileStyle="ARV"
      />
      <EncounterTile
        mockData={mockData_Last_Visit}
        patientUuid={patientUuid}
        columns={columnsCharacteristics}
        description={displayTextHIV}
        headerTitle="Last Visit Details"
        tileStyle=""
      /> */}
    </>
  );
};

export default ServiceSummaryOverviewList;
