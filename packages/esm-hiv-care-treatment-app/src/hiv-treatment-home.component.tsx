import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import CTSummaryTiles from './views/care-and-treatment/care-and-treatment/summary-tiles/ct-summary-tiles.component';
import CTHomePatientTabs from './views/care-and-treatment/patient-list-tabs/ct-patient-list-tabs.component';

const Homecomponent = () => {
  return (
    <div>
      <OHRIWelcomeSection title="Care and Treatment" />
      <CTSummaryTiles />
      <CTHomePatientTabs />
    </div>
  );
};

export default Homecomponent;
