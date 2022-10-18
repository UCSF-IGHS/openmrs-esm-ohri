import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MnchSummaryListProps {
  patientUuid: string;
}

const MnchSummaryList: React.FC<MnchSummaryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('mnch_summary_header', 'Mnch Summary');
  const displayText = t('mnch_summary_display', 'Mnch Summary');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default MnchSummaryList;
