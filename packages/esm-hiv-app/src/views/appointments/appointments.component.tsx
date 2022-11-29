import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';

interface AppointmentsListProps {
  patientUuid: string;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('appointments', 'Appointments');

  return (
    <>
      <EmptyState displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default AppointmentsList;
