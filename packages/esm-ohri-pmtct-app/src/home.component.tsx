import React from 'react';
import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import MaternalChildSummaryTiles from './pmtct/home-dashboard/maternal-child-summary-tiles.component';
import MotherChildSummary from './pmtct/home-dashboard/mother-child-summary-tabs.component';

const Home: React.FC = () => {
  return (
    <div>
      <OHRIWelcomeSection title="Maternal & Child Health" />
      <MaternalChildSummaryTiles />
      <MotherChildSummary />
    </div>
  );
};

export default Home;
