import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TbTreatmentFollowUpListProps {
  patientUuid: string;
}

const TbTreatmentFollowUpList: React.FC<TbTreatmentFollowUpListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('TbTreatmentFollowUp');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default TbTreatmentFollowUpList;
