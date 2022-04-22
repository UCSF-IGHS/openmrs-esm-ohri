import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../common.scss';
import PartnerNotificationList from './partner-notification.component';
import ContactTracingList from './tabs/contact-tracing.component';

interface OverviewListProps {
  patientUuid: string;
}

const PartnerNotificationServices: React.FC<OverviewListProps> = ({ patientUuid }) => (
  <div className={styles.tabContainer}>
    <Tabs type="container">
      <Tab label="Partner Notification" className="tab-12rem">
        <PartnerNotificationList patientUuid={patientUuid} />
      </Tab>
      <Tab label="Contact Tracing" style={{ padding: 0 }}>
        <ContactTracingList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
  </div>
);

export default PartnerNotificationServices;
