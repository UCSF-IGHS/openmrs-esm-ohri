import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface AntenatalCareListProps {
  patientUuid: string;
}

const AntenatalCareList: React.FC<AntenatalCareListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('antenatal_care_header', 'Antenatal Care');
  const displayText = t('antenatal_care_display', 'Antenatal Care');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default AntenatalCareList;
