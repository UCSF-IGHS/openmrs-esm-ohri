import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface DisclosureListProps {
  patientUuid: string;
}

const DisclosureList: React.FC<DisclosureListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('disclosure', 'Disclosure');
  const displayText = t('disclosure', 'Disclosure');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default DisclosureList;
