import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';

interface MnchEnrolmentListProps {
  patientUuid: string;
}

const MnchEnrolmentList: React.FC<MnchEnrolmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('mnch_enrollment_header', 'Mnch Enrolment');
  const displayText = t('mnch_enrollment_display', 'Mnch Enrolment');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default MnchEnrolmentList;
