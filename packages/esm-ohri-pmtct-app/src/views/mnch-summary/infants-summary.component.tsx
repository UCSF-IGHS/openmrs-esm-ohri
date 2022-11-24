import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface InfantSummaryListProps {
  patientUuid: string;
}

const InfantSummaryList: React.FC<InfantSummaryListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('infantSummary', "Infant's Summary");

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default InfantSummaryList;
