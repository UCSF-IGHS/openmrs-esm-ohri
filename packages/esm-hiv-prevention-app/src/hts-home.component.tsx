import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import OHRIPatientTabs from './hts/home-dashboard-testing-services/patient-tabs/hts-patient-tabs.component';
import HTSSummaryTiles from './hts/home-dashboard-testing-services/summary-tiles/hts-summary-tiles.component';

const Homecomponent = () => {
  return (
    <div>
      <OHRIWelcomeSection title="HIV Testing Services" />
      <HTSSummaryTiles launchWorkSpace={() => {}} />
      <OHRIPatientTabs />
    </div>
  );
};

export default Homecomponent;
