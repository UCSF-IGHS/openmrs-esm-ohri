import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  EncounterList,
  EncounterListColumn,
  getEncounterValues,
  getObsFromEncounter,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';
import { useConfig } from '@openmrs/esm-framework';

interface ServiceEnrolmentProps {
  patientUuid: string;
}

const ServiceEnrolmentWidget: React.FC<ServiceEnrolmentProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const config = useConfig();

  const columns: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'date',
        header: t('config.obsConcepts.enrolmentDate', 'Date of service enrollment'),
        getValue: (encounter) => {
          return getEncounterValues(encounter, 'encounterDatetime', true);
        },
        link: {
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        },
      },
      {
        key: 'patientType',
        header: t('patientType', 'Patient Type at Enrollment'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.patientTypeEnrollmentConcept);
        },
      },
      {
        key: 'dateConfirmedPositive',
        header: t('dateConfirmedPositive', 'Date Confirmed HIV Positive'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.dateOfHIVDiagnosisConcept, true);
        },
      },
      {
        key: 'entryPoint',
        header: t('entryPoint', 'Entry Point'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.entryPointConcept);
        },
      },
      {
        key: 'populationType',
        header: t('populationType', 'Population Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.studyPopulationTypeConcept);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: () => {},
      },
    ],
    [],
  );

  const headerTitle = t('serviceEnrolment', 'Service Enrolment');

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterType={config.encounterTypes.careAndTreatmentEncounterType}
      formList={[{ name: config.formNames.ServiceEnrolmentFormName }]}
      columns={columns}
      description={headerTitle}
      headerTitle={headerTitle}
      launchOptions={{
        moduleName: moduleName,
      }}
    />
  );
};

export default ServiceEnrolmentWidget;
