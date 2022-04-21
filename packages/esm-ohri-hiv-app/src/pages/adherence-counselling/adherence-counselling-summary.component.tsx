import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../common.scss';
import AdherenceCounsellingList from './tabs/adherence-counselling.component';
import EnhancedAdherenceCounsellingList from './tabs/enhanced-adherence-counselling.component';

interface OverviewListProps {
  patientUuid: string;
}

const AdherenceCounsellingSummary: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="Adherence Counselling" className="tab-12rem">
        <AdherenceCounsellingList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Enhanced Adherence Counselling" className="tab-16rem" style={{ padding: 0 }}>
        <EnhancedAdherenceCounsellingList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default AdherenceCounsellingSummary;
