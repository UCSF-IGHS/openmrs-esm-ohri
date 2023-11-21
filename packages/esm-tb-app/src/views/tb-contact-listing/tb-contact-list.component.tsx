import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TbContactTracingListProps {
  patientUuid: string;
}

const TbContactTracingList: React.FC<TbContactTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('TbContactListing');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default TbContactTracingList;
