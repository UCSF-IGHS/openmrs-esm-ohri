import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  EncounterList,
  EncounterListColumn,
  getObsFromEncounter,
  MultipleEncounterList,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  Cd4Count_UUID,
  Cd4LabResultCountPercentage_UUID,
  Cd4LabResultDate_UUID,
  CD4LabResultsEncounter_UUID,
} from '../../../constants';

interface LabTestOverviewListProps {
  patientUuid: string;
}

const LabTestOverviewList: React.FC<LabTestOverviewListProps> = ({ patientUuid }) => {
  const encounters: Array<string> = [CD4LabResultsEncounter_UUID];
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'testResultDate',
        header: t('testName', 'Test Name'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter[CD4LabResultsEncounter_UUID], Cd4LabResultDate_UUID, true);
        },
      },
      {
        key: 'CD4Count',
        header: t('value', 'Value'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, Cd4Count_UUID);
        },
      },
      {
        key: 'CD4Count',
        header: t('referenceRange', 'Reference Range'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, Cd4LabResultCountPercentage_UUID);
        },
      },
    ],
    [],
  );

  const headerTitle = t('cd4', 'Lab Tests');
  const displayText = t('cd4', 'Lab Tests');

  return (
    <MultipleEncounterList
      patientUuid={patientUuid}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      encounterTypeUuids={encounters}
    />
  );
};

export default LabTestOverviewList;
