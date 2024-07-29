import React from 'react';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientsFinalHIVStatus } from './usePatientHivStatus';
import { useConfig } from '@openmrs/esm-framework';

export function PatientStatusBannerTag({ patientUuid }) {
  const { t } = useTranslation();
  const { obsConcepts } = useConfig();
  const { isLoading, hivStatus, error } = usePatientsFinalHIVStatus(
    patientUuid,
    obsConcepts.finalHIVCodeConcept,
    obsConcepts.finalPositiveHIVValueConcept,
  );

  if (isLoading) {
    return <p>{t('loading', 'Loading...')}</p>;
  }

  if (error) {
    return <p>{t('error', 'Error...')}</p>;
  }

  return <>{hivStatus && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}</>;
}
