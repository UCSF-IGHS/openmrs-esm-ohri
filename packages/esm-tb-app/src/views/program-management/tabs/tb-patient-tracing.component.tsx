import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../..';
import { TbPatientTracingEncounterType, contactDate, contactMethod } from '../../../constants';

const TbPatientTracing: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('PatientTracing', 'Patient Tracing');
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'contactDate',
        header: t('contactDate', 'Contact Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, contactDate, true);
        },
      },
      {
        key: 'contactMethod',
        header: t('contactMethod', 'Contact Method'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, contactMethod);
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Contact Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '', true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'TB Patient Tracing Form' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'TB Patient Tracing Form' },
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
      encounterType={TbPatientTracingEncounterType}
      formList={[{ name: 'TB Patient Tracing Form' }]}
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

export default TbPatientTracing;
