import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import TbHomePatientTabs from './views/dashboard/patient-list-tabs/tb-patient-list-tabs.component';
import TbSummaryTiles from './views/dashboard/summary-tiles/tb-summary-tiles.component';

const Homecomponent = () => {
  return (
    <div>
      <OHRIWelcomeSection title="TB Treatment" />
      <TbSummaryTiles />
      <TbHomePatientTabs />
    </div>
  );
};

export default Homecomponent;
