import React, { useEffect, useState } from 'react';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { isPatientHivPositive } from './patientHivStatus';

export function PatientStatusBannerTag({ patientUuid }) {
  const { t } = useTranslation();
  const [hivPositive, setHivPositive] = useState(false);

  useEffect(() => {
    isPatientHivPositive(patientUuid).then((result) => setHivPositive(result));
  }, [hivPositive, patientUuid]);

  //TODO: Improve refresh time
  // forceRerender();

  return <>{hivPositive && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}</>;
}
