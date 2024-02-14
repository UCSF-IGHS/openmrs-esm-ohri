import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../index';
import { useConfig } from '@openmrs/esm-framework';

const TbContactTracingList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const headerTitle = t('TbContactListing', 'TB Contact Listing');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseId', 'TB Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.caseID);
        },
      },
      {
        key: 'dateContactListed',
        header: t('dateContactListed', 'Date Contact Listed'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.dateContacted, true);
        },
      },
      {
        key: 'location',
        header: t('loction', 'Location'),
        getValue: (encounter) => {
          return encounter.location.name;
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'TB Contact Listing' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'TB Contact Listing' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={config.encounterTypes.tbContactListing}
      formList={[{ name: 'TB Contact Listing', uuid: 'cb16d920-62f1-3696-b781-e6a4f5e80de1' }]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default TbContactTracingList;
