import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import CovidHomePatientTabs from './views/dashboard/patient-list-tabs/covid-patient-list-tabs.component';
import CovidSummaryTiles from './views/dashboard/summary-tiles/covid-summary-tiles.component';

const Homecomponent = () => {
  return (
    <div>
      <OHRIWelcomeSection title="COVID-19 Cases" />
      <CovidSummaryTiles />
      <CovidHomePatientTabs />
    </div>
  );
};

export default Homecomponent;
