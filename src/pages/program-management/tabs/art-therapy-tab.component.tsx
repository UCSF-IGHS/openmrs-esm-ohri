import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';
import styles from '../../common.scss';
import { DataTableSkeleton } from 'carbon-components-react';

import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
  getLatestARTDateConcept,
  getARTReasonConcept,
} from '../../../components/encounter-list/encounter-list.component';
import {
  artTherapyDateTime_UUID,
  art_Therapy_EncounterUUID,
  therapyPlanConcept,
  regimenLine_UUID,
  regimenConcept,
  artStopDateUUID,
  substitutionDateUUID,
  switchDateUUID,
  dateRestartedUUID,
} from '../../../constants';

interface ArtTherapyTabListProps {
  patientUuid: string;
}

const ARTDates: string[] = [artTherapyDateTime_UUID, switchDateUUID, substitutionDateUUID, artStopDateUUID];

const columns: EncounterListColumn[] = [
  {
    key: 'initiationDate',
    header: 'Date(ART Start, Stopped, Switched, Changed, Restarted)',
    getValue: encounter => {
      return getObsFromEncounter(
        encounter,
        getLatestARTDateConcept(encounter, {
          artTherapyDateTime_UUID,
          switchDateUUID,
          substitutionDateUUID,
          artStopDateUUID,
          dateRestartedUUID,
        }),
        true,
      );
    },
  },
  {
    key: 'therapyPlan',
    header: 'Therapy Plan',
    getValue: encounter => {
      return getObsFromEncounter(encounter, therapyPlanConcept);
    },
  },
  {
    key: 'regimen',
    header: 'Regimen',
    getValue: encounter => {
      return getObsFromEncounter(encounter, regimenConcept);
    },
  },
  {
    key: 'regimenInitiated',
    header: 'Regimen line',
    getValue: encounter => {
      return getObsFromEncounter(encounter, regimenLine_UUID);
    },
  },
  {
    key: 'reason',
    header: 'Reason',
    getValue: encounter => {
      return getObsFromEncounter(
        encounter,
        getARTReasonConcept(encounter, {
          artTherapyDateTime_UUID,
          switchDateUUID,
          substitutionDateUUID,
          artStopDateUUID,
          dateRestartedUUID,
        }),
      );
    },
  },
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
