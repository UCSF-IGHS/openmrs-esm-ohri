import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface FamilyLinkageListProps {
  patientUuid: string;
}

const FamilyLinkageList: React.FC<FamilyLinkageListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('familyLinkage', 'Family Linkage');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default FamilyLinkageList;
