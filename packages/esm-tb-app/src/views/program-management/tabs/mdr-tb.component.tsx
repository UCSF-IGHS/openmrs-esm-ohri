import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EncounterList,
  EncounterListColumn,
  PatientChartProps,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../..';
import { useConfig } from '@openmrs/esm-framework';
import { usePatientTreatmentOutcome } from '../../../hooks/usePatientTreatmentOutcome';

const MdrTbList: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const { isEmptyOutcome } = usePatientTreatmentOutcome(patientUuid);
  const headerTitle = t('MdrTbEnrolment', 'TB/MDR TB Enrolment');
  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.DateEnrolledToTB, true);
        },
      },
      {
        key: 'caseID',
        header: t('caseID', 'Case ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.caseID);
        },
      },
      {
        key: 'tbTreatmentId',
        header: t('tbTreatmentId', 'TB Treatement ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.TreatmentId);
        },
      },
      {
        key: 'treatmentStartDate',
        header: t('treatmentStartDate', 'Treatment Start Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.TreatmentStartDate, true);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.Drregimen);
        },
      },
      {
        key: 'treatmentOutcome',
        header: t('treatmentOutcome', 'Treatment outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.outcome);
        },
      },
      {
        key: 'dateOfTreatmentOutcome',
        header: t('dateOfTreatmentOutcome', 'Date of Treatment Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.DateOfTreatmentOutcome, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'TB Case Enrollment Form' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'TB Case Enrollment Form' },
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
      encounterType={config.encounterTypes.tbProgramEnrollment}
      formList={[{ name: 'TB Case Enrollment Form' }]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        displayText: t('add', 'Add'),
        moduleName: moduleName,
        hideFormLauncher: isEmptyOutcome,
      }}
    />
  );
};

export default MdrTbList;
