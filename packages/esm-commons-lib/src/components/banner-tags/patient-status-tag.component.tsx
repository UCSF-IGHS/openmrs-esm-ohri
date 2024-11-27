import React from 'react';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientHivStatus } from './patientHivStatus';

interface PatientStatusBannerTagProps {
  patientUuid: string;
  outcomeTagColor?: string;
  mappedOutcome?: string;
  motherName?: string;
  childrenNames?: string[];
  patientGender?: string;
}

export const PatientStatusBannerTag: React.FC<PatientStatusBannerTagProps> = ({
  patientUuid,
  outcomeTagColor,
  mappedOutcome,
  motherName,
  childrenNames,
  patientGender,
}) => {
  const { t } = useTranslation();

  const { hivStatus } = usePatientHivStatus(patientUuid);

  return (
    <>
      {hivStatus === 'positive' && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}
      {hivStatus === 'negative' && <Tag type="green">{t('hivNegative', 'HIV Negative')}</Tag>}

      {mappedOutcome && outcomeTagColor && <Tag type={outcomeTagColor}>{mappedOutcome}</Tag>}

      {motherName && <Tag type="purple">Mother: {motherName}</Tag>}

      {patientGender === 'F' && childrenNames.length > 0 && (
        <Tag type="purple">Children: {childrenNames.join(' || ')}</Tag>
      )}
    </>
  );
};
