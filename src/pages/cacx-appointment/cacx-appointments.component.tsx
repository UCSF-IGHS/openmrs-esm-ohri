import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyStateComingSoon from '../../components/empty-state/empty-state-comingsoon.component';

interface CacxAppointmentsListProps {
  patientUuid: string;
}

const CacxAppointmentsList: React.FC<CacxAppointmentsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('cacx appointments', 'CaCx Appointments');
  const displayText = t('cacx appointments', 'CaCx Appointments');

  return (
    <>
      <EmptyStateComingSoon displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default CacxAppointmentsList;
