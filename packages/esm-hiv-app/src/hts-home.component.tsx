import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import OHRIPatientTabs from './views/hts/home/patient-tabs/ohri-patient-tabs.component';
import HTSSummaryTiles from './views/hts/home/summary-tiles/hts-summary-tiles.component';

const Homecomponent = () => {
  return (
    <div>
      <OHRIWelcomeSection title="TB Treatment" />
      <HTSSummaryTiles launchWorkSpace={() => {}} />
      <OHRIPatientTabs />
    </div>
  );
};

export default Homecomponent;
