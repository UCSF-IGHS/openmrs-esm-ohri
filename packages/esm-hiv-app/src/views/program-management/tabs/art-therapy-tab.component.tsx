import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EncounterList, EncounterListColumn, getObsFromEncounter, findObs } from '@ohri/openmrs-esm-ohri-commons-lib';
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
  restartReasonUUID,
  stopReasonUUID,
  substituteReasonUUID,
  switchReasonUUID,
} from '../../../constants';
import { moduleName } from '../../../index';

interface ArtTherapyTabListProps {
  patientUuid: string;
}

export const getARTDateConcept = (
  encounter,
  startDate,
  switchDate,
  substitutionDate,
  stopDate,
  restartDate,
): string => {
  let artStartDate = findObs(encounter, startDate);
  let artSwitchDate = findObs(encounter, switchDate);
  let artSubstitutionDate = findObs(encounter, substitutionDate);
  let artStopDate = findObs(encounter, stopDate);
  let artRestartDate = findObs(encounter, restartDate);

  artStartDate = artStartDate ? artStartDate.value : null;
  artSubstitutionDate = artSubstitutionDate ? artSubstitutionDate.value : null;
  artSwitchDate = artSwitchDate ? artSwitchDate.value : null;
  artStopDate = artStopDate ? artStopDate.value : null;
  artRestartDate = artRestartDate ? artRestartDate.value : null;

  let latestDateConcept: string = startDate;
  let latestDate = artStartDate;
  if (artSubstitutionDate != null) {
    latestDateConcept = substitutionDate;
    latestDate = artSubstitutionDate;
  }
  if (artSwitchDate != null) {
    latestDate = artSwitchDate;
    latestDateConcept = switchDate;
  }
  if (artStopDate != null) {
    latestDate = artStopDate;
    latestDateConcept = stopDate;
  }
  if (artRestartDate != null) {
    latestDate = artRestartDate;
    latestDateConcept = restartDate;
  }

  return latestDateConcept;
};

const getARTReasonConcept = (encounter, startDate, switchDate, substitutionDate, stopDate, restartDate): string => {
  const latestDateConcept: string = getARTDateConcept(
    encounter,
    startDate,
    switchDate,
    substitutionDate,
    stopDate,
    restartDate,
  );

  let artReaseonConcept;
  switch (latestDateConcept) {
    case startDate:
      artReaseonConcept = '';
      break;
    case substitutionDate:
      artReaseonConcept = substituteReasonUUID;
      break;
    case switchDate:
      artReaseonConcept = switchReasonUUID;
      break;
    case restartDate:
      artReaseonConcept = restartReasonUUID;
      break;
    case stopDate:
      artReaseonConcept = stopReasonUUID;
    default:
      artReaseonConcept = stopReasonUUID;
  }

  return artReaseonConcept;
};

const ArtTherapyTabList: React.FC<ArtTherapyTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const artConcepts = useMemo(
    () =>
      new Map([
        ['1256AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', t('artStart', 'Start ART')],
        ['1258AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', t('artSubstitute', 'Substitute ART Regimen')],
        ['1259AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', t('artSwitch', 'Switch ART Regimen Line')],
        ['1260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', t('artStop', 'Stop ART')],
        ['3e69cb60-2943-410f-83d4-b359ae83fefd', t('artRestart', 'Restart ART therapy')],
      ]),
    [],
  );

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'initiationDate',
        header: t('initDate', 'Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(
            encounter,
            getARTDateConcept(
              encounter,
              artTherapyDateTime_UUID,
              switchDateUUID,
              substitutionDateUUID,
              artStopDateUUID,
              dateRestartedUUID,
            ),
            true,
          );
        },
      },
      {
        key: 'therapyPlan',
        header: t('therapyPlan', 'Therapy Plan'),
        getValue: (encounter) => {
          const therapyPlanObs = findObs(encounter, therapyPlanConcept);
          return therapyPlanObs ? artConcepts.get(therapyPlanObs.value.uuid) : '--';
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, regimenConcept);
        },
      },
      {
        key: 'regimenInitiated',
        header: t('regimenInitiated', 'Regimen line'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, regimenLine_UUID);
        },
      },
      {
        key: 'reason',
        header: t('reason', 'Reason'),
        getValue: (encounter) => {
          const reasonConcept = getARTReasonConcept(
            encounter,
            artTherapyDateTime_UUID,
            switchDateUUID,
            substitutionDateUUID,
            artStopDateUUID,
            dateRestartedUUID,
          );
          return getObsFromEncounter(encounter, reasonConcept);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'ART Therapy Form', package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'ART Therapy Form', package: 'hiv' },
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

  const headerTitle = t('artTherapy', 'ART Therapy');
  const displayText = t('artTherapy', 'ART Therapy');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={art_Therapy_EncounterUUID}
      formList={[{ name: 'ART Therapy Form' }]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
      }}
    />
  );
};

export default ArtTherapyTabList;
