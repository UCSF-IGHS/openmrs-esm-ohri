import React, { useEffect } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';

const AppointmentsDashboard = () => {
  return <ExtensionSlot extensionSlotName="ohri-dashboard-appointments-slot" state={{}} />;
};

export default AppointmentsDashboard;
