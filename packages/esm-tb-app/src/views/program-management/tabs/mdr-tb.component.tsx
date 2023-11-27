import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../..';

const MdrTbList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('MdrTbEnrolment', 'TB/MDR TB Enrolment');
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'contactDate',
        header: t('contactDate', 'Enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '', true);
        },
      },
      {
        key: 'contactMethod',
        header: t('contactMethod', 'Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'TB Treatement ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Treatment Start Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '', true);
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Regimen'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Treatment outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '');
        },
      },
      {
        key: 'contactOutcome',
        header: t('contactOutcome', 'Date of Treatment Outcome'),
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

export default MdrTbList;
