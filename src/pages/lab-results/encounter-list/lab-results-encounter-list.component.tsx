import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = 'HTS Lab Results';

  const launchHTSForm = (form?: any) => {};

  return (
    <>
      <EmptyState displayText="HTS Lab Results" headerTitle={headerTitle} launchForm={launchHTSForm} />
    </>
  );
};

export default LabResultsOverviewList;
