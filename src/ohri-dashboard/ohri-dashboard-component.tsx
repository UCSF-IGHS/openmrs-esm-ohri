import React from 'react';
import { render } from 'react-dom';
import styles from './ohri-dashboard.scss';
import OHRIDashboardSideNav from './side-menu/ohri-dashboard-side-nav.component';
import { ExtensionSlot } from '@openmrs/esm-framework';

const OHRIDashboard = () => (
  <div className="container">
    <>
      <OHRIDashboardSideNav />

      <div className="bx--grid">
        <div className="bx--row">
          <ExtensionSlot extensionSlotName="ohri-dashboard-content-slot" />
        </div>
      </div>
    </>
  </div>
);

export default OHRIDashboard;
