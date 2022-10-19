import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MaternalSummaryListProps {
  patientUuid: string;
}

const MaternalSummaryList: React.FC<MaternalSummaryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('maternal_summary_header', 'Maternal Summary');
  const displayText = t('maternal_summary_display', 'Maternal Summary');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default MaternalSummaryList;
