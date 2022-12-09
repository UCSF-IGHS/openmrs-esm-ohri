import React, { useEffect } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';

const OutpatientDashboard = () => {
  useEffect(() => {
    attach('ohri-dashboard-outpatient-slot', 'outpatient-dashboard');
    return () => detach('ohri-dashboard-outpatient-slot', 'outpatient-dashboard');
  }, []);

  return <ExtensionSlot extensionSlotName="ohri-dashboard-outpatient-slot" state={{}} />;
};

export default OutpatientDashboard;
