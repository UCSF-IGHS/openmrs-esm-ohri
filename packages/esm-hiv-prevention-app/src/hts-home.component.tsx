import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import OHRIPatientTabs from './views/testing-services/patient-tabs/ohri-patient-tabs.component';
import HTSSummaryTiles from './views/testing-services/summary-tiles/hts-summary-tiles.component';

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
