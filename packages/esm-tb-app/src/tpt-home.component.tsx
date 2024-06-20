import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import React from 'react';
import TbSummaryTiles from './tb/dashboard/summary-tiles/tb-summary-tiles.component';
import TptPatientListTabs from './tb/dashboard/patient-list-tabs/tpt-patient-list-tabs.component';

const TptHomeComponent = () => {
  return (
    <div>
      <OHRIWelcomeSection title="TB Prevention" />
      <TbSummaryTiles />
      <TptPatientListTabs />
    </div>
  );
};

export default TptHomeComponent;
