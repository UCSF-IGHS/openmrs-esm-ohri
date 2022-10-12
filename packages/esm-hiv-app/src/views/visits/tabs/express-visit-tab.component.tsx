import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  ExpressEncounterDate,
  ExpressRefferalReason,
  ExpressTBOutcome,
  ExpressVisitEncounterType,
  ExpressVisitType,
} from '../../../constants';

interface ExpressVisitListProps {
  patientUuid: string;
}

const ExpressVisitList: React.FC<ExpressVisitListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitDate',
        header: t('ExpressVisitDate', 'Visit Date'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, ExpressEncounterDate, true);
        },
        link: {
          getUrl: encounter => encounter.url,
          handleNavigate: encounter => {
            encounter.launchFormActions?.viewEncounter();
          },
        },
      },
      {
        key: 'visitType',
        header: t('ExpressVisitType', 'Visit Type'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, ExpressVisitType);
        },
      },
      {
        key: 'screeningOutcome',
        header: t('ExpressTB', 'TB Screening Outcome'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, ExpressTBOutcome);
        },
      },
      {
        key: 'appointmentReason',
        header: t('ExpressRefferal', 'Refferal Reason'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, ExpressRefferalReason);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: encounter => {
          const baseActions = [
            {
              form: { name: 'exress_visit', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('ExpressViewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'exress_visit', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('ExpressEditForm', 'Edit Form'),
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  const headerTitle = t('expressVisit', 'Express Visit');
  const displayText = t('expressVisit', 'Express visit encounters');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={ExpressVisitEncounterType}
      form={{ package: 'hiv', name: 'exress_visit' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
    />
  );
};

export default ExpressVisitList;
