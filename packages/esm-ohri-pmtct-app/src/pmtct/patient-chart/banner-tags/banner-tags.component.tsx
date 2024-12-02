import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePatientOutcome } from './useInfantFinalOutcome';
import { usePatientFamilyNames } from './usePatientFamilyNames';
import { PatientStatusBannerTag } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MotherChildTagProps {
  patientUuid: string;
}

const MotherChildTag: React.FC<MotherChildTagProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const { patientOutcome } = usePatientOutcome(patientUuid);
  const { childrenNames, motherName, patientGender, isLoading, isError } = usePatientFamilyNames(patientUuid);

  if (isLoading) {
    return null;
  }

  if (isError) {
    console.error('Error fetching family information');
    return null;
  }

  const outcomeColorMapping: { [key: string]: string } = {
    'Still in Care': 'green',
    'HIV negative infant discharged from PMTCT': 'green',
    'Lost to followup': 'red',
    'Dead': 'red',
    'Transferred out': 'red',
    'Transfer in': 'red',
    'Confirmed HIV positive': 'red',
  };

  const outcomeTagColor = outcomeColorMapping[patientOutcome] || 'gray';
  //Not to future self -- transfer in shouldnt be confirmed HIV positive
  const mappedOutcome =
    patientOutcome === 'Transfer in' ? t('confirmedHivPositive', 'Confirmed HIV Positive') : patientOutcome;

  return (
    <PatientStatusBannerTag
      patientUuid={patientUuid}
      outcomeTagColor={outcomeTagColor}
      mappedOutcome={mappedOutcome}
      motherName={motherName}
      childrenNames={childrenNames}
      patientGender={patientGender}
    />
  );
};

export default MotherChildTag;
