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
import { moduleName } from '../../../index';

interface CD4OverviewListProps {
  patientUuid: string;
}

const CD4OverviewList: React.FC<CD4OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('cd4', 'CD4');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'testResultDate',
        header: t('testResultDate', 'Test Result Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, Cd4LabResultDate_UUID, true);
        },
      },
      {
        key: 'CD4Count',
        header: t('cd4Count', 'CD4 Count'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, Cd4Count_UUID);
        },
      },
      {
        key: 'CD4CountPercentage',
        header: t('cd4ountPercentage', 'CD4 %'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, Cd4LabResultCountPercentage_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
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

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={CD4LabResultsEncounter_UUID}
      formList={[{ name: 'CD4 Lab Result' }]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default CD4OverviewList;
