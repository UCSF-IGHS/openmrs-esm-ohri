import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface DeathTabListProps {
  patientUuid: string;
}

const DeathTabList: React.FC<DeathTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('death', 'Death');
  const displayText = t('death', 'Death');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default DeathTabList;
