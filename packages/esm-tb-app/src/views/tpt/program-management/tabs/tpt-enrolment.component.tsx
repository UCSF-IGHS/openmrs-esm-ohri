import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface TptEnrolmentListProps {
  patientUuid: string;
}

const TptEnrolmentList: React.FC<TptEnrolmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('tptEnrolment');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default TptEnrolmentList;
