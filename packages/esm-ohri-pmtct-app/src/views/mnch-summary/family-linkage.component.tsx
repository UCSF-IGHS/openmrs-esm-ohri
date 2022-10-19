import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface FamilyLinkageListProps {
  patientUuid: string;
}

const FamilyLinkageList: React.FC<FamilyLinkageListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('family_linkage_header', 'Family Linkage');
  const displayText = t('family_linkage_display', 'Family Linkage');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default FamilyLinkageList;
