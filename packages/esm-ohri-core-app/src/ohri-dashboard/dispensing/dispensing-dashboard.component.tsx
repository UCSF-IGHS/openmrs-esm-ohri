import React, { useEffect } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';

const DispensingDashboard = () => {
  useEffect(() => {
    attach('ohri-dashboard-dispensing-slot', 'dispensing-dashboard');
    return () => detach('ohri-dashboard-dispensing-slot', 'dispensing-dashboard');
  }, []);

  return <ExtensionSlot name="ohri-dashboard-dispensing-slot" state={{}} />;
};

export default DispensingDashboard;
