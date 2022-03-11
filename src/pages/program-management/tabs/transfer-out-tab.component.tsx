import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface TransferOutTabListProps {
  patientUuid: string;
}

const TransferOutTabList: React.FC<TransferOutTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('transferOut', 'Transfer Out');
  const displayText = t('transferOut', 'Transfer Out');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default TransferOutTabList;
