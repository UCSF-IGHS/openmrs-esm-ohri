import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../common.scss';
import PartnerNotificationList from './partner-notification.component';
import ContactTracingList from './tabs/contact-tracing.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const PartnerNotificationServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs type="container">
        <Tab label={t('partnerNotification', 'Partner Notification')} className="tab-12rem">
          <PartnerNotificationList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('contactTracing', 'Contact Tracing')} style={{ padding: 0 }}>
          <ContactTracingList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PartnerNotificationServices;
