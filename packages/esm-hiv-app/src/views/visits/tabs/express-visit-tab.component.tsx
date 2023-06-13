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
import { moduleName } from '../../../index';

interface ExpressVisitListProps {
  patientUuid: string;
}

const ExpressVisitList: React.FC<ExpressVisitListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'expressVisitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ExpressEncounterDate, true);
        },
        link: {
          getUrl: (encounter) => encounter.url,
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        },
      },
      {
        key: 'expressVisitType',
        header: t('visitType', 'Visit Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ExpressVisitType);
        },
      },
      {
        key: 'expressScreeningOutcome',
        header: t('tbScreeningOutcome', 'TB Screening Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ExpressTBOutcome);
        },
      },
      {
        key: 'expressRefferalReason',
        header: t('refferalReason', 'Refferal Reason'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, ExpressRefferalReason);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'express_visit', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'express_visit', package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('editForm', 'Edit Form'),
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
      encounterType={ExpressVisitEncounterType}
      formList={[{ name: 'POC Express Visit Form' }]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      launchOptions={{
        moduleName: moduleName,
      }}
    />
  );
};

export default ExpressVisitList;
