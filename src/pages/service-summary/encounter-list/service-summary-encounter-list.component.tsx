import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface OverviewListProps {
  patientUuid: string;
}

const ServiceSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'Service Summary';

  const launchHTSForm = (form?: any) => {};

  return (
    <>
      <EmptyState displayText="Service Summary" headerTitle={headerTitle} launchForm={launchHTSForm} />
    </>
  );
};

export default ServiceSummaryOverviewList;
