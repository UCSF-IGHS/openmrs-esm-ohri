import React, { useMemo } from 'react';

import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface ClinicalVisitWidgetProps {
  patientUuid: string;
}

const ClinicalVisitWidget: React.FC<ClinicalVisitWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { obsConcepts, encounterTypes } = useConfig();

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
        key: 'clinicalRegimen',
        header: t('regimen', 'Regimen'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.regimenConcept);
        },
      },
      {
        key: 'clinicalDifferentiatedCareService',
        header: t('differentiatedCareService', 'Differentiated Care Service'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, obsConcepts.expressCareProgramStatusConcept);
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
          return encounter.actions;
        },
      },
    ],
    [],
  );
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={encounterTypes.clinicalVisitEncounterType}
      formList={[{ name: 'POC Clinical Visit Form v2' }]}
      columns={columns}
      description="clinical visit encounters"
      headerTitle="Clinical Visits"
      launchOptions={{
        moduleName: moduleName,
      }}
    />
  );
};

export default ClinicalVisitWidget;
