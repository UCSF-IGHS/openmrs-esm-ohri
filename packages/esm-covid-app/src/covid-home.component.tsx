import React from 'react';
import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import CovidHomePatientTabs from './covid/dashboard/patient-list-tabs/covid-patient-list-tabs.component';
import CovidSummaryTiles from './covid/dashboard/summary-tiles/covid-summary-tiles.component';

const CovidHome = () => {
  return (
    <div>
      <OHRIWelcomeSection title="COVID-19 Cases" />
      <CovidSummaryTiles />
      <CovidHomePatientTabs />
    </div>
  );
};

export default CovidHome;
