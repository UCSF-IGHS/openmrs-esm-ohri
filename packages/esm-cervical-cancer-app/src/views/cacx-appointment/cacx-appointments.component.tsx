import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyStateComingSoon } from 'openmrs-esm-ohri-commons-lib';

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
