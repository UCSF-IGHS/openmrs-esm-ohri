import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from 'openmrs-esm-ohri-commons-lib';

interface EnhancedAdherenceCounsellingListProps {
  patientUuid: string;
}

const EnhancedAdherenceCounsellingList: React.FC<EnhancedAdherenceCounsellingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('enhancedAdherenceCounselling', 'Enhanced Adherence Counselling');
  const displayText = t('enhancedAdherenceCounselling', 'Enhanced Adherence Counselling');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default EnhancedAdherenceCounsellingList;
