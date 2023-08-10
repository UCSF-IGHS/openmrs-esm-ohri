import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
  EncounterList,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  ReasonForViralLoad_UUID,
  ViralLoadCopies_UUID,
  ViralLoadRequestFormName,
  ViralLoadResultDate_UUID,
  ViralLoadResultsEncounter_UUID,
  ViralLoadResult_UUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface LabResultsOverviewListProps {
  patientUuid: string;
}

const LabResultsOverviewList: React.FC<LabResultsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'testResultDate',
        header: t('testResultDate', 'Test Result Date'),
        getValue: (encounter) => {
          return getEncounterValues(encounter, ViralLoadResultDate_UUID, true);
        },
      },
      {
        key: 'reasonForViralLoad',
        header: t('viralLoadReason', 'Reason for Viral Load'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ReasonForViralLoad_UUID);
        },
      },
      {
        key: 'viralLoadResult',
        header: t('viralLoadResult', 'Viral Load Result'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ViralLoadResult_UUID);
        },
      },
      {
        key: 'viralLoadCopies',
        header: t('viralLoadCopies', 'Viral Load Copies'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ViralLoadCopies_UUID);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: ViralLoadRequestFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: 'View Details',
              mode: 'view',
            },
            {
              form: { name: ViralLoadRequestFormName, package: 'hiv' },
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
    return encounter?.form?.name === ViralLoadRequestFormName;
  };

  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={viralLoadRequestFilter}
      encounterType={ViralLoadResultsEncounter_UUID}
      formList={[{ name: ViralLoadRequestFormName }]}
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
