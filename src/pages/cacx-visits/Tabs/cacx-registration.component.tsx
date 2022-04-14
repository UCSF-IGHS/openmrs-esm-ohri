import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../../components/empty-state/empty-state-comingsoon.component';

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
