import React from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../../components/empty-state/empty-state-comingsoon.component';
interface OverviewListProps {
  patientUuid: string;
}

const DrugOrdersOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('drugOrders', 'Drug Orders');
  const displayText = t('drugOrders', 'Drug Orders');

  return (
    <>
      <EmptyStateComingSoon headerTitle={headerTitle} displayText={displayText} />
    </>
  );
};

export default DrugOrdersOverviewList;
