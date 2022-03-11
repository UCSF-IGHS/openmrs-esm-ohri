import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface IntimatePartnerViolenceListProps {
  patientUuid: string;
}

const IntimatePartnerViolenceList: React.FC<IntimatePartnerViolenceListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('intimatePartnerViolence', 'Intimate Partner Violence');
  const displayText = t('intimatePartnerViolence', 'Intimate Partner Violence');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default IntimatePartnerViolenceList;
