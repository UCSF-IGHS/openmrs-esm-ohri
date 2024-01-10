import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  EncounterList,
  EncounterListColumn,
  getObsFromEncounter,
  MultipleEncounterList,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';

interface LabTestOverviewListProps {
  patientUuid: string;
}

const LabTestOverviewList: React.FC<LabTestOverviewListProps> = ({ patientUuid }) => {
  const { obsConcepts, encounterTypes } = useConfig();
  const encounters: Array<string> = [encounterTypes.CD4LabResultsEncounter_UUID];
  const { t } = useTranslation();
  const headerTitle = t('labTests', 'Lab Tests');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'labTestName',
        header: t('testName', 'Test Name'),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter[encounterTypes.CD4LabResultsEncounter_UUID],
            obsConcepts.Cd4LabResultDate_UUID,
            true,
          );
        },
      },
      {
        key: 'labTestValue',
        header: t('value', 'Value'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.Cd4Count_UUID);
        },
      },
      {
        key: 'labTestRefRange',
        header: t('referenceRange', 'Reference Range'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.Cd4LabResultCountPercentage_UUID);
        },
      },
    ],
    [],
  );

  return (
    <MultipleEncounterList
      patientUuid={patientUuid}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      encounterTypeUuids={encounters}
    />
  );
};

export default LabTestOverviewList;
