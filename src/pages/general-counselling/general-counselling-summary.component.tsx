import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../common.scss';
import MentalHealthAssessmentList from './tabs/mental-health-assessment.component';
import DrugsAndAlcoholUseList from './tabs/drugs-and-alcohol-use.component';
import IntimatePartnerViolenceList from './tabs/intimate-partner-violence.component';
import DisclosureList from './tabs/disclosure.component';

interface OverviewListProps {
  patientUuid: string;
}

const GeneralCounsellingSummary: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="Mental Health Assessment" className="tab-14rem">
        <MentalHealthAssessmentList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Drugs and Alcohol Use" className="tab-12rem" style={{ padding: 0 }}>
        <DrugsAndAlcoholUseList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Intimate Partner Violence" className="tab-14rem" style={{ padding: 0 }}>
        <IntimatePartnerViolenceList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Disclosure" style={{ padding: 0 }}>
        <DisclosureList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default GeneralCounsellingSummary;
