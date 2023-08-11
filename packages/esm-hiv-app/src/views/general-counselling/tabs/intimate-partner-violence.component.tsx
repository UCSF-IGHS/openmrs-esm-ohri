import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, EncounterList, findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  EmotionalAbuse_UUID,
  IntimatePartnerEncounterType_UUID,
  IntimatePartnerFormName,
  IpvScreeningDate_UUID,
  PhysicalAbuse_UUID,
  SexualAbuse_UUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface IntimatePartnerViolenceListProps {
  patientUuid: string;
}

const IntimatePartnerViolenceList: React.FC<IntimatePartnerViolenceListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'screeningdate',
        header: t('screeningDate', 'Screening Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, IpvScreeningDate_UUID, true);
        },
      },
      {
        key: 'physicalAbuse',
        header: t('physicalAbuse', 'Physical Abuse'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, PhysicalAbuse_UUID, false, true);
        },
      },
      {
        key: 'EmotionalAbuse',
        header: t('EmotionalAbuse', 'Emotional Abuse'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, EmotionalAbuse_UUID, false, true);
        },
      },
      {
        key: 'sexualAbuse',
        header: t('sexualAbuse', 'Sexual Abuse'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, SexualAbuse_UUID, false, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: IntimatePartnerFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: 'View Details',
            mode: 'view',
          },
          {
            form: { name: IntimatePartnerFormName, package: 'hiv' },
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
    return encounter?.form?.name === IntimatePartnerFormName;
  };
  return (
    <EncounterList
      patientUuid={patientUuid}
      filter={intimatePartnerFilter}
      encounterType={IntimatePartnerEncounterType_UUID}
      formList={[{ name: IntimatePartnerFormName }]}
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
