import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../index';

const TbContactTracingList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('TbContactListing', 'TB Contact Listing');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'caseID',
        header: t('caseId', 'Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ' ');
        },
      },
      {
        key: 'nameOfContact',
        header: t('nameOfContact', 'Name of Contact'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '', true);
        },
      },
      {
        key: 'relationshipToIndex',
        header: t('relationshipToIndex', 'Relationship to Index'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'phoneNumber',
        header: t('phoneNumber', 'Phone Number'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '', true);
        },
      },
      {
        key: 'address',
        header: t('address', 'Address'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '', true);
        },
      },
    ],
    [],
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={''}
      formList={[{ name: '' }]}
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
