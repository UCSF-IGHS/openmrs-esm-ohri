import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../index';
import {
  CaseId,
  ClientListingEncounterType,
  NameOfContact,
  RelationshipIndex,
  address,
  phoneNumber,
} from '../../constants';

const TbContactTracingList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('TbContactListing', 'TB Contact Listing');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseId', 'Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, CaseId);
        },
      },
      {
        key: 'nameOfContact',
        header: t('nameOfContact', 'Name of Contact'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, NameOfContact);
        },
      },
      {
        key: 'relationshipToIndex',
        header: t('relationshipToIndex', 'Relationship to Index'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, RelationshipIndex);
        },
      },
      {
        key: 'phoneNumber',
        header: t('phoneNumber', 'Phone Number'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, phoneNumber);
        },
      },
      {
        key: 'address',
        header: t('address', 'Address'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, address);
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
      encounterType={ClientListingEncounterType}
      formList={[{ name: 'TB Contact Listing' }]}
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
