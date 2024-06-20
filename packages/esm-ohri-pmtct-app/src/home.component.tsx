import React from 'react';
import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import MaternalChildSummaryTiles from './pmtct/summary-tabs/maternal-child-summary-tiles.component';
import MotherChildSummary from './pmtct/summary-tabs/mother-child-summary-tabs.component';

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
