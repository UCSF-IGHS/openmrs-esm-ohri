import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  Cd4Count_UUID,
  Cd4LabResultCountPercentage_UUID,
  Cd4LabResultDate_UUID,
  CD4LabResultsEncounter_UUID,
  hivCD4Result_UUID,
} from '../../../constants';

interface CD4OverviewListProps {
  patientUuid: string;
}

const CD4OverviewList: React.FC<CD4OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'testResultDate',
        header: t('testResultDate', 'Test Result Date'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, Cd4LabResultDate_UUID, true);
        },
      },
      {
        key: 'CD4Count',
        header: t('cd4Count', 'CD4 Count'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, Cd4Count_UUID);
        },
      },
      {
        key: 'CD4CountPercentage',
        header: t('cd4ountPercentage', 'CD4 %'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, Cd4LabResultCountPercentage_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: encounter => {
          const baseActions = [
            {
              form: { name: 'cd4_lab_results', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: 'cd4_lab_results', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'Edit form',
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('cd4Title', 'CD4');
  const displayText = t('cd4Display', 'CD4');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={CD4LabResultsEncounter_UUID}
      form={{ package: 'hiv', name: 'cd4_lab_results' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default CD4OverviewList;
