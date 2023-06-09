import React, { useEffect } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';

const DispensingDashboard = () => {
  return <ExtensionSlot name="ohri-dashboard-dispensing-slot" state={{}} />;
};

export default DispensingDashboard;
