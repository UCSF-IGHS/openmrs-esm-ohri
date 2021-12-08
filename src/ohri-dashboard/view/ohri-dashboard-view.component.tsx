import React from 'react';
import { ExtensionSlot } from '@openmrs/esm-react-utils';

const DashboardView: React.FC<{ dashboardSlot: string; title: string }> = ({ dashboardSlot, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ExtensionSlot extensionSlotName={dashboardSlot} />
    </div>
  );
};

export default DashboardView;
