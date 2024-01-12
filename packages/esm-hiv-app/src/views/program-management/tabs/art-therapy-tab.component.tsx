import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EncounterList, EncounterListColumn, getObsFromEncounter, findObs } from '@ohri/openmrs-esm-ohri-commons-lib';

import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

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

const ArtTherapyTabList: React.FC<ArtTherapyTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames } = useConfig();

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
        artReaseonConcept = obsConcepts.substituteReasonUUID;
        break;
      case switchDate:
        artReaseonConcept = obsConcepts.switchReasonUUID;
        break;
      case restartDate:
        artReaseonConcept = obsConcepts.freeTextCommentConcept;
        break;
      case stopDate:
        artReaseonConcept = obsConcepts.stopReasonUUID;
      default:
        artReaseonConcept = obsConcepts.stopReasonUUID;
    }

    return artReaseonConcept;
  };

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
              obsConcepts.artTherapyDateTime_UUID,
              obsConcepts.switchDateUUID,
              obsConcepts.substitutionDateUUID,
              obsConcepts.artStopDateUUID,
              obsConcepts.dateRestartedUUID,
            ),
            true,
          );
        },
      },
      {
        key: 'therapyPlan',
        header: t('therapyPlan', 'Therapy Plan'),
        getValue: (encounter) => {
          const therapyPlanObs = findObs(encounter, obsConcepts.therapyPlanConcept);
          return therapyPlanObs ? artConcepts.get(therapyPlanObs.value.uuid) : '--';
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.regimenConcept);
        },
      },
      {
        key: 'regimenInitiated',
        header: t('regimenInitiated', 'Regimen line'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.regimenLine_UUID);
        },
      },
      {
        key: 'reason',
        header: t('reason', 'Reason'),
        getValue: (encounter) => {
          const reasonConcept = getARTReasonConcept(
            encounter,
            obsConcepts.artTherapyDateTime_UUID,
            obsConcepts.switchDateUUID,
            obsConcepts.substitutionDateUUID,
            obsConcepts.artStopDateUUID,
            obsConcepts.dateRestartedUUID,
          );
          return getObsFromEncounter(encounter, reasonConcept);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: formNames.ARTTherapyFormName, package: 'hiv' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: formNames.ARTTherapyFormName, package: 'hiv' },
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
      encounterType={encounterTypes.art_Therapy_EncounterUUID}
      formList={[{ name: formNames.ARTTherapyFormName }]}
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
