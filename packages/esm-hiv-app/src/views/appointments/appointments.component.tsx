import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';

interface AppointmentsListProps {
  patientUuid: string;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('appointmentsTitle', 'Appointments');
  const displayText = t('appointmentsDisplay', 'Appointments');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default AppointmentsList;
