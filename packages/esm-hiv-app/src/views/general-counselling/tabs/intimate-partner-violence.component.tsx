import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, EncounterList, findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface IntimatePartnerViolenceListProps {
  patientUuid: string;
}

const IntimatePartnerViolenceList: React.FC<IntimatePartnerViolenceListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames } = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'screeningdate',
        header: t('screeningDate', 'Screening Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.IpvScreeningDate_UUID, true);
        },
      },
      {
        key: 'physicalAbuse',
        header: t('physicalAbuse', 'Physical Abuse'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.PhysicalAbuse_UUID, false, true);
        },
      },
      {
        key: 'EmotionalAbuse',
        header: t('EmotionalAbuse', 'Emotional Abuse'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.EmotionalAbuse_UUID, false, true);
        },
      },
      {
        key: 'sexualAbuse',
        header: t('sexualAbuse', 'Sexual Abuse'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.SexualAbuse_UUID, false, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: formNames.IntimatePartnerFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'View Details',
            mode: 'view',
          },
          {
            form: { name: formNames.IntimatePartnerFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'Edit Form',
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );
  const headerTitle = t('intimatePartnerViolenceTitle', 'Intimate Partner Violence');
  const displayText = t('intimatePartnerViolenceDisplay', 'Intimate Partner Violence');

  const intimatePartnerFilter = (encounter) => {
    return encounter?.form?.name === formNames.IntimatePartnerFormName;
  };
  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={intimatePartnerFilter}
      encounterType={encounterTypes.IntimatePartnerEncounterType_UUID}
      formList={[{ name: formNames.IntimatePartnerFormName }]}
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

export default IntimatePartnerViolenceList;
