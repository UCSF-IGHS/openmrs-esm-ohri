import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from 'openmrs-esm-ohri-commons-lib';

interface CacxRegistrationListProps {
  patientUuid: string;
}

const CacxRegistrationList: React.FC<CacxRegistrationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx registration', 'CaCx Registration');
  const displayText = t('cacx registration', 'CaCx Registration');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CacxRegistrationList;
