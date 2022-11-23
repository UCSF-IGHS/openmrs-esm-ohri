import React, { useEffect } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';

const AppointmentsDashboard = () => {
  useEffect(() => {
    attach('ohri-dashboard-appointments-slot', 'clinical-appointments-dashboard');
    return () => detach('ohri-dashboard-appointments-slot', 'clinical-appointments-dashboard');
  }, []);

  return <ExtensionSlot extensionSlotName="ohri-dashboard-appointments-slot" state={{}} />;
};

export default AppointmentsDashboard;
