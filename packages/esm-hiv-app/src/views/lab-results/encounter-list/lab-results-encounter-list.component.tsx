import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
  EncounterList,
} from 'openmrs-esm-ohri-commons-lib';
import {
  ReasonForViralLoad_UUID,
  ViralLoadCopies_UUID,
  ViralLoadResultDate_UUID,
  ViralLoadResultsEncounter_UUID,
  ViralLoadResult_UUID,
} from '../../../constants';

interface LabResultsOverviewListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'testResultDate',
    header: 'Test Result Date',
    getValue: encounter => {
      return getEncounterValues(encounter, ViralLoadResultDate_UUID, true);
    },
  },
  {
    key: 'reasonForViralLoad',
    header: 'Reason for Viral Load',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ReasonForViralLoad_UUID);
    },
  },
  {
    key: 'viralLoadResult',
    header: 'Viral Load Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ViralLoadResult_UUID);
    },
  },
  {
    key: 'viralLoadCopies',
    header: 'Viral Load Copies',
    getValue: encounter => {
      return getObsFromEncounter(encounter, ViralLoadCopies_UUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'viral_load_request', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'viral_load_request', package: 'hiv' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Edit form',
          mode: 'edit',
        },
      ];
      return baseActions;
    },
  },
];

const LabResultsOverviewList: React.FC<LabResultsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labResults', 'Viral Load');
  const displayText = t('labResults', 'Viral Load');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={ViralLoadResultsEncounter_UUID}
      form={{ package: 'hiv', name: 'viral_load_request' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default LabResultsOverviewList;
