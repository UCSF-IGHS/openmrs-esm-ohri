import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';

interface AppointmentsListProps {
  patientUuid: string;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('appointments', 'Appointments');
  const displayText = t('appointments', 'Appointments');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default AppointmentsList;
