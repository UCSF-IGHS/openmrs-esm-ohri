import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../../components/empty-state/empty-state-comingsoon.component';

interface OverviewListProps {
  patientUuid: string;
}

const CD4OverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('CD4', 'CD4');
  const displayText = t('CD4', 'CD4');

  return (
    <>
      <EmptyStateComingSoon headerTitle={headerTitle} displayText={displayText} />
    </>
  );
};

export default CD4OverviewList;
