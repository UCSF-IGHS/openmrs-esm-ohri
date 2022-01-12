import React, { useEffect, useState } from 'react';
import Tag from 'carbon-components-react/es/components/Tag';
import TooltipDefinition from 'carbon-components-react/es/components/TooltipDefinition';
import { useVisit } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import styles from './active-visit-tag.scss';
import { isPatientHivPositive } from './patientHivStatus';

function PatientStatusBannerTag({ patientUuid }) {
  const { currentVisit } = useVisit(patientUuid);
  const { t } = useTranslation();
  const [hivPositive, setHivPositive] = useState(false);

  const [rerender, setRerender] = useState(true);
  const forceRerender = () => setRerender(!rerender);

  const isPositive = isPatientHivPositive(patientUuid);

  useEffect(() => {
    isPatientHivPositive(patientUuid).then(result => setHivPositive(result));
  }, [hivPositive, patientUuid]);

  //TODO: Improve refresh time
  // forceRerender();

  return <>{hivPositive && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}</>;
}

export default PatientStatusBannerTag;
