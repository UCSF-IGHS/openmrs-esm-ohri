import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../../../../views/common.scss';
import CD4ResultsList from './Tabs/cd4-results.component';
import ViralLoadResultsList from './Tabs/viral-load-results.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="CD4 Lab Results" className="tab-14rem">
        <CD4ResultsList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Viral Load Results" className="tab-12rem" style={{ padding: 0 }}>
        <ViralLoadResultsList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default LabResultsSummary;
