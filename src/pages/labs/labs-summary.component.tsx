import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';

interface LabsListProps {
  patientUuid: string;
}

const LabsList: React.FC<LabsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('labs', 'Labs');
  const displayText = t('labs', 'Labs');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default LabsList;
