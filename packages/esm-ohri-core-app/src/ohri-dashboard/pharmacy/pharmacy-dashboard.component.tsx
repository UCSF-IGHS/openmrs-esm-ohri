import React, { useEffect } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';

const PharmacysDashboard = () => {
  useEffect(() => {
    attach('ohri-dashboard-pharmacy-slot', 'clinical-pharmacy-dashboard');
    return () => detach('ohri-dashboard-pharmacy-slot', 'clinical-pharmacy-dashboard');
  }, []);

  return <ExtensionSlot extensionSlotName="ohri-dashboard-pharmacy-slot" state={{}} />;
};

export default PharmacysDashboard;
