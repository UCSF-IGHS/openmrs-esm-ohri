import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../common.scss';
import HIVEnrolmentTabList from './tabs/hiv-enrolment-tab.component';
import ServiceDeliveryTabList from './tabs/service-delivery-tab.component';
import ArtTherapyTabList from './tabs/art-therapy-tab.component';
import DeathTabList from './tabs/death-tab.component';
import TransferOutTabList from './tabs/transfer-out-tab.component';
import PatientTracingList from '../partner-notification-services/tabs/patient-tracing.component';

interface OverviewListProps {
  patientUuid: string;
}

const ProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="HIV Enrolment">
        <HIVEnrolmentTabList patientUuid={patientUuid} />
      </Tab>
      <Tab label="ART Therapy" style={{ padding: 0 }}>
        <ArtTherapyTabList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Service Delivery" style={{ padding: 0 }}>
        <ServiceDeliveryTabList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Transfer - Out" style={{ padding: 0 }}>
        <TransferOutTabList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Patient Tracing" style={{ padding: 0 }}>
        <PatientTracingList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Death" style={{ padding: 0 }}>
        <DeathTabList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default ProgramManagementSummary;
