import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface OverviewListProps {
  patientUuid: string;
}

const DrugOrdersOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'Drug Orders';

  const launchHTSForm = (form?: any) => {};

  return (
    <>
      <EmptyState displayText="Drug Orders" headerTitle={headerTitle} launchForm={launchHTSForm} />
    </>
  );
};

export default DrugOrdersOverviewList;
