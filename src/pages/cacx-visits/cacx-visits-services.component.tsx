import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../common.scss';
import CaCxRegistrationList from './Tabs/cacx-registration.component';
import CacxScreeningList from './Tabs/cacx-screening.component';
import CacxTreatmentList from './Tabs/cacx-treatment.component';

interface OverviewListProps {
  patientUuid: string;
}

const CaCxCervicalCancerServices: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="CaCx Registration" className="tab-12rem">
        <CaCxRegistrationList patientUuid={patientUuid} />
      </Tab>
      <Tab label="CaCx Screening" style={{ padding: 0 }}>
        <CacxScreeningList patientUuid={patientUuid} />
      </Tab>
      <Tab label="CaCx Treatment" style={{ padding: 0 }}>
        <CacxTreatmentList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default CaCxCervicalCancerServices;
