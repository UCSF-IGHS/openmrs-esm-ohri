import React from 'react';
import { Tag } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientHivStatus } from './patientHivStatus';
import { usePatientOutcome } from './useInfantFinalOutcome';
import { usePatientFamilyNames } from './usePatientFamilyNames';

export function PatientStatusBannerTag({ patientUuid }) {
  const { t } = useTranslation();

  const { hivStatus } = usePatientHivStatus(patientUuid);

  const { patientOutcome } = usePatientOutcome(patientUuid);

  const greenOutcomes = ['Still in Care', 'Confirmed HIV negative infant (discharged from PMTCT)', 'Missing'];
  const redOutcomes = ['Confirmed HIV Positive', 'Lost to Follow Up', 'Dead', 'Transferred Out'];

  let outcomeTagColor = '';
  if (greenOutcomes.includes(patientOutcome)) {
    outcomeTagColor = 'green';
  } else if (redOutcomes.includes(patientOutcome)) {
    outcomeTagColor = 'red';
  }

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
      {hivStatus === 'positive' && <Tag type="red">{t('hivPositive', 'HIV Positive')}</Tag>}
      {hivStatus === 'negative' && <Tag type="green">{t('hivNegative', 'HIV Negative')}</Tag>}

      {patientOutcome && outcomeTagColor && <Tag type={outcomeTagColor}>{patientOutcome}</Tag>}

      {patientAge !== null && patientAge <= 14 && motherName && <Tag type="purple">Mother: {motherName}</Tag>}

      {patientAge !== null && patientAge > 14 && patientGender === 'F' && childrenNames.length > 0 && (
        <Tag type="purple">Children: {childrenNames.join('     ||     ')}</Tag>
      )}
    </>
  );
}
