import React from 'react';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientHivStatus } from './patientHivStatus';
import { usePatientFamilyNames } from './usePatientFamilyNames';

export function PatientStatusBannerTag({ patientUuid }) {
  const { t } = useTranslation();
  const { hivStatus } = usePatientHivStatus(patientUuid);
  const { childrenNames, motherName, patientAge, patientGender, isLoading, isError } =
    usePatientFamilyNames(patientUuid);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <div>Error fetching family information</div>;
  }

  return (
    <>
      {/* HIV Status Display */}
      {hivStatus === 'positive' && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}
      {hivStatus === 'negative' && <Tag type="green">{t('hivNegative', 'HIV Negative')}</Tag>}

      {/* Mother Name Display (if patient is under 10) */}
      {patientAge !== null && patientAge <= 14 && motherName && <Tag type="purple">Mother: {motherName}</Tag>}

      {/* Children Names Display (if patient is female and over 10) */}
      {patientAge !== null && patientAge > 14 && patientGender === 'F' && childrenNames.length > 0 && (
        <Tag type="purple">Children: {childrenNames.join('     ||     ')}</Tag>
      )}
    </>
  );
}

export default PatientStatusBannerTag;
