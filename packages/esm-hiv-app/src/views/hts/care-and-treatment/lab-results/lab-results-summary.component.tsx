import React, { useState } from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../lab-results/Tabs/patient-list.scss';
import CD4ResultsList from './Tabs/cd4-results.component';
import ViralLoadResultsList from './Tabs/viral-load-results.component';
import LabResultsSummaryTiles from './lab-results-summary-tiles.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  return (
    // <div className={styles.tabContainer}>
    <Tabs type="container" className={styles.tabContainer}>
      <Tab label="CD4 Lab Results" className="tab-14rem">
        <CD4ResultsList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Viral Load Results" className="tab-12rem" style={{ padding: 0 }}>
        <ViralLoadResultsList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
    // </div>
  );
};

export default LabResultsSummary;
