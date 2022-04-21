import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../common.scss';
import ClinicalVisitList from './clinical-visit-tab.component';
import ExpressVisitList from './express-visit-tab.component';

interface OverviewListProps {
  patientUuid: string;
}

const VisitsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="Clinical Visit">
        <ClinicalVisitList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Express Visit" style={{ padding: 0 }}>
        <ExpressVisitList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default VisitsSummary;
