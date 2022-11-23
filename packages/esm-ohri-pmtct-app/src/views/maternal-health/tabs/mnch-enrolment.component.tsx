import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MnchEnrolmentListProps {
  patientUuid: string;
}

const MnchEnrolmentList: React.FC<MnchEnrolmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('mnchEnrollment', 'MNCH Enrolment');

  return (
    <>
      <EmptyStateComingSoon displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default MnchEnrolmentList;
