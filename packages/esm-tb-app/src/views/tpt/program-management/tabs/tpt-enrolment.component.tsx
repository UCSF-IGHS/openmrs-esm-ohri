import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../..';
import { useConfig } from '@openmrs/esm-framework';

interface TptEnrolmentListProps {
  patientUuid: string;
}

const TptEnrolmentList: React.FC<TptEnrolmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames } = useConfig();

  const headerTitle = t('tptEnrolment', 'TPT Enrolment');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'enrollmentDate',
        header: t('enrollmentDate', 'Enrollment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptEnrollmentDate, true);
        },
      },
      {
        key: 'tptTreatmentID',
        header: t('tptTreatmentID', 'TPT Treatment ID'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptTreatmentId);
        },
      },
      {
        key: 'indication',
        header: t('indication', 'Indication'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptIndication);
        },
      },
      {
        key: 'treatmentStartDate',
        header: t('treatmentStartDate', 'Treatment start date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptTreatmentStartDate, true);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptRegimen);
        },
      },
      {
        key: 'tptOutcome',
        header: t('tptOutcome', 'Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptOutcome);
        },
      },
      {
        key: 'dateOfOutcome',
        header: t('dateOfOutcome', 'Date of Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tptOutcomeDate, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: formNames.TptCaseEnrolmentFormName },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: formNames.TptCaseEnrolmentFormName },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Edit Form'),
            mode: 'edit',
          },
          {
            form: { name: formNames.TptOutcomeFormName },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('editForm', 'Add/Edit Outcome'),
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
      encounterType={encounterTypes.tptCaseEnrollment}
      formList={[
        { name: formNames.TptCaseEnrolmentFormName },
        { name: formNames.TptOutcomeFormName, excludedIntents: ['*'] },
      ]}
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

export default TptEnrolmentList;
