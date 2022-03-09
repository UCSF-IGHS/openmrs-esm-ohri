import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface HIVEnrolmentTabListProps {
  patientUuid: string;
}

const HIVEnrolmentTabList: React.FC<HIVEnrolmentTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('hivEnrolment', 'HIV Enrolment');
  const displayText = t('hivEnrolment', 'HIV Enrolment');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default HIVEnrolmentTabList;
