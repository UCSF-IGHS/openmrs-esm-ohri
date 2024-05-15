import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface CD4OverviewListProps {
  patientUuid: string;
}

const CD4OverviewList: React.FC<CD4OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('cd4', 'CD4');
  const { obsConcepts, encounterTypes, formNames } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'testResultDate',
        header: t('testResultDate', 'Test Result Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.Cd4LabResultDate_UUID, true);
        },
      },
      {
        key: 'CD4Count',
        header: t('cd4Count', 'CD4 Count'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.hivCD4Count_UUID);
        },
      },
      {
        key: 'CD4CountPercentage',
        header: t('cd4ountPercentage', 'CD4 %'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.Cd4LabResultCountPercentage_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.CD4LabResultsFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: formNames.CD4LabResultsFormName, package: 'hiv' },
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

  const cd4LabResultsFilter = (encounter) => {
    return encounter?.form?.name === formNames.CD4LabResultsFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={cd4LabResultsFilter}
      encounterType={encounterTypes.CD4LabResultsEncounter_UUID}
      formList={[{ name: formNames.CD4LabResultsFormName }]}
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
