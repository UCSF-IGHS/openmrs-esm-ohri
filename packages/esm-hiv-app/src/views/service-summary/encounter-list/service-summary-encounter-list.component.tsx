import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterTile } from '../../../../../esm-commons-lib/src/components/encounter-tile/encounter-tile.component';
import {
  EncounterList,
  EncounterListColumn,
  findObs,
  getObsFromEncounter,
} from '../../../../../esm-commons-lib/src/components/encounter-list/encounter-list.component';

import {
  careAndTreatmentEncounterType,
  Cd4LabResultDate_UUID,
  hivCD4Count_UUID,
  ViralLoadResultDate_UUID,
  ViralLoadResult_UUID,
} from '../../../constants';
interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('serviceSummary', 'HIV C&T Patient Summary');
  const displayText = t('serviceSummary', 'HIV C&T Patient Summary');

  const headerHIV = t('hivStatus', 'HIV Status');
  const displayTextHIV = t('hivStatus', 'HIV Status');

  const headerHIVPending = t('hivStatus', 'Pending Lab Orders');
  const displayTextPending = t('hivStatus', 'Pending Lab Orders');

  const columnsHIV: EncounterListColumn[] = [
    {
      key: 'lastViralLoad',
      header: t('vlResult', 'Last viral Load'),
      getValue: ({ latestEncounter }) => {
        return getObsFromEncounter(latestEncounter, ViralLoadResult_UUID);
      },
    },
    {
      key: 'vlDate',
      header: t('vlDate', 'Recent VL Date'),
      getValue: ({ latestEncounter }) => {
        return getObsFromEncounter(latestEncounter, ViralLoadResultDate_UUID, true);
      },
    },
    {
      key: 'lastCD4Count',
      header: t('lastCD4Count', 'Last CD4 Count'),
      getValue: ({ latestEncounter }) => {
        return getObsFromEncounter(latestEncounter, hivCD4Count_UUID);
      },
    },
    {
      key: 'cd4ResultDate',
      header: t('cd4ResultDate', 'Recent CD4 Date'),
      getValue: ({ latestEncounter }) => {
        return getObsFromEncounter(latestEncounter, Cd4LabResultDate_UUID, true);
      },
    },
    // {
    //   key: 'enrolledInCare',
    //   header: 'Enrolled in care',
    //   getValue: encounter => {
    //     return ' ';
    //   },
    // },
    // {
    //   key: 'currentWHO',
    //   header: 'Current WHO stage',
    //   getValue: encounter => {
    //     return ' ';
    //   },
    // },
  ];
  return (
    <>
      <EncounterTile
        patientUuid={patientUuid}
        encounterUuid={careAndTreatmentEncounterType}
        form={{ package: 'hiv', name: 'cd4_lab_results' }}
        columns={columnsHIV}
        description={displayTextHIV}
        headerTitle={headerHIV}
        dropdownText="Change "
      />
    </>
  );
};

export default ServiceSummaryOverviewList;
