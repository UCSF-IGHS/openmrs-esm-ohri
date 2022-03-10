import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface ExpressVisitListProps {
  patientUuid: string;
}

const ExpressVisitList: React.FC<ExpressVisitListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('expressVisit', 'Express Visit');
  const displayText = t('expressVisit', 'Express Visit');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default ExpressVisitList;
