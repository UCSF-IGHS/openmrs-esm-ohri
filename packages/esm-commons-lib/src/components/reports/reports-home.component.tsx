import React from 'react';
import { OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import { Reports } from './reports';

const ReportsHomecomponent = () => {
  return (
    <div>
      <OHRIWelcomeSection title="Reports" />
      <Reports />
    </div>
  );
};

export default ReportsHomecomponent;
