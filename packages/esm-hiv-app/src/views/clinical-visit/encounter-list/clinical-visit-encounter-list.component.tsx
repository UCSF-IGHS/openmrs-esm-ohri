import React, { useMemo } from 'react';
import {
  clinicalVisitEncounterType,
  dateOfEncounterConcept,
  expressCareProgramStatusConcept,
  regimenConcept,
  returnVisitDateConcept,
  visitTypeConcept,
} from '../../../constants';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';

interface ClinicalVisitWidgetProps {
  patientUuid: string;
}

const ClinicalVisitWidget: React.FC<ClinicalVisitWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitDate',
        header: t('visitDate', 'Visit Date'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, dateOfEncounterConcept, true);
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
        header: t('visitType', 'Visit Type'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, visitTypeConcept);
        },
      },
      {
        key: 'regimen',
        header: t('regimen', 'Regimen'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, regimenConcept);
        },
      },
      {
        key: 'differentiatedCareService',
        header: t('differentiatedCareService', 'Differentiated Care Service'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, expressCareProgramStatusConcept);
        },
      },
      {
        key: 'nextAppointmentDate',
        header: t('nextAppointmentDate', 'Next Appointment Date'),
        getValue: encounter => {
          return getObsFromEncounter(encounter, returnVisitDateConcept, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: encounter => {
          return encounter.actions;
        },
      },
    ],
    [],
  );
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={clinicalVisitEncounterType}
      form={{ package: 'hiv', name: 'clinical_visit' }}
      columns={columns}
      description="clinical visit encounters"
      headerTitle="Clinical Visits"
    />
  );
};

export default ClinicalVisitWidget;
