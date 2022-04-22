import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import CD4OverviewList from '../cd4/cd4-encounter-list.component';
import styles from './lab-results-overview.scss';
import LabResultsOverviewList from '../encounter-list/lab-results-encounter-list.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsOverview: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="Viral Load">
        <LabResultsOverviewList patientUuid={patientUuid} />
      </Tab>
      <Tab label="CD4" style={{ padding: 0 }}>
        <CD4OverviewList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default LabResultsOverview;
