import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
  EncounterList,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface LabResultsOverviewListProps {
  patientUuid: string;
}

const LabResultsOverviewList: React.FC<LabResultsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames, formUuids } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'testResultDate',
        header: t('testResultDate', 'Test Result Date'),
        getValue: (encounter) => {
          return getEncounterValues(encounter, obsConcepts.ViralLoadResultDate_UUID, true);
        },
      },
      {
        key: 'reasonForViralLoad',
        header: t('viralLoadReason', 'Reason for Viral Load'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ReasonForViralLoad_UUID);
        },
      },
      {
        key: 'viralLoadResult',
        header: t('viralLoadResult', 'Viral Load Result'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ViralLoadResult_UUID);
        },
      },
      {
        key: 'viralLoadCopies',
        header: t('viralLoadCopies', 'Viral Load Copies'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.ViralLoadCopies_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.ViralLoadRequestFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: formNames.ViralLoadRequestFormName, package: 'hiv' },
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

  const headerTitle = t('labResults', 'Viral Load');
  const displayText = t('labResults', 'Viral Load');

  const viralLoadRequestFilter = (encounter) => {
    return encounter?.form?.name === formNames.ViralLoadRequestFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={viralLoadRequestFilter}
      encounterType={encounterTypes.ViralLoadResultsEncounter_UUID}
      formList={[{ name: formNames.ViralLoadRequestFormName, uuid: formUuids.viralLoadRequestFormUuid }]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default LabResultsOverviewList;
