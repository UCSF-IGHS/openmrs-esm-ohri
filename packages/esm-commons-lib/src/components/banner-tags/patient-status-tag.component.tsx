import React, { useEffect, useState } from 'react';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientHivStatus } from './patientHivStatus';

export function PatientStatusBannerTag({ patientUuid }) {
  const { t } = useTranslation();
  const { hivStatus } = usePatientHivStatus(patientUuid);

  return (
    <>
      {hivStatus === 'positive' && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}
      {hivStatus === 'negative' && <Tag type="green">{t('hivNegative', 'HIV Negative')}</Tag>}
    </>
  );
}

export default PatientStatusBannerTag;
