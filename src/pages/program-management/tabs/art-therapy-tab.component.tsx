import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import styles from '../../common.scss';
import { DataTableSkeleton } from 'carbon-components-react';

import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
} from '../../../components/encounter-list/encounter-list.component';
import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  refusedTreatment_UUID,
  regimenLine_UUID,
} from '../../../constants';

interface ArtTherapyTabListProps {
  patientUuid: string;
}

const columns: EncounterListColumn[] = [
  {
    key: 'initiationDate',
    header: 'Date of ART initiation',
    getValue: encounter => {
      return getObsFromEncounter(encounter, artTherapyDateTime_UUID, true);
    },
  },
  {
    key: 'regimenInitiated',
    header: 'Regimen line',
    getValue: encounter => {
      return getObsFromEncounter(encounter, regimenLine_UUID);
    },
  },
  // {
  //   key: 'StopRx',
  //   header: 'Refused (Stopped) Treatment',
  //   getValue: encounter => {
  //     return getObsFromEncounter(encounter, refusedTreatment_UUID);
  //   },
  // },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
      {
        form: { name: 'art_therapy', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Details',
        mode: 'view',
      },
      {
        form: { name: 'art_therapy', package: 'hiv' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Form',
        mode: 'edit',
      },
    ],
  },
];

const ArtTherapyTabList: React.FC<ArtTherapyTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('artTherapy', 'ART Therapy');
  const displayText = t('artTherapy', 'ART Therapy');

  return (
    // <>
    //   <EmptyState displayText={displayText} headerTitle={headerTitle} />
    // </>
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={art_Therapy_EncounterUUID}
      form={{ package: 'hiv', name: 'art_therapy' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default ArtTherapyTabList;
