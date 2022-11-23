import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';

interface OverviewListProps {
  patientUuid: string;
}

const DrugOrdersOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('drugOrders', 'Drug Orders');

  const launchHTSForm = (form?: any) => {};

  return (
    <>
      <EmptyState displayText={headerTitle} headerTitle={headerTitle} launchForm={launchHTSForm} />
    </>
  );
};

export default DrugOrdersOverviewList;
