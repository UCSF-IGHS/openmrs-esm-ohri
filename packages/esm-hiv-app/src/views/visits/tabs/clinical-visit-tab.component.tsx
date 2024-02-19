import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterListColumn, getObsFromEncounter, EncounterList } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface ClinicalVisitListProps {
  patientUuid: string;
}

const ClinicalVisitList: React.FC<ClinicalVisitListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes, formNames, formUuids } = useConfig();

  const headerTitle = t('clinicalVisit', 'Clinical Visit');
  const displayText = t('clinicalVisit', 'Clinical Visit');

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'clinicalVisitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.dateOfEncounterConcept, true);
        },
        link: {
          getUrl: (encounter) => encounter.url,
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        },
      },
      {
        key: 'clinicalVisitType',
        header: t('visitType', 'Visit Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.visitTypeConcept);
        },
      },
      {
        key: 'clinicalScreeningOutcome',
        header: t('tbScreeningOutcome', 'TB Screening Outcome'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.tbScreeningOutcome);
        },
      },
      {
        key: 'clinicalNextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.returnVisitDateConcept, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: formNames.ClinicalVisitFormName, package: 'hiv' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: formNames.ClinicalVisitFormName, package: 'hiv' },
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

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypes.clinicalVisitEncounterType}
      formList={[{ name: formNames.ClinicalVisitFormName, uuid: formUuids.clinicalVisitFormUuid }]}
      columns={columns}
      description="clinical visit encounters"
      headerTitle={headerTitle}
      launchOptions={{
        moduleName: moduleName,
      }}
    />
  );
};

export default ClinicalVisitList;
