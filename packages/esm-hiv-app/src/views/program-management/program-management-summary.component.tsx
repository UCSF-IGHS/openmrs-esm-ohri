import React from 'react';
import { Tabs, Tab } from '@carbon/react';
import styles from '../common.scss';
import HIVEnrolmentTabList from './tabs/hiv-enrolment-tab.component';
import ServiceDeliveryTabList from './tabs/service-delivery-tab.component';
import ArtTherapyTabList from './tabs/art-therapy-tab.component';
import DeathTabList from './tabs/death-tab.component';
import TransferOutTabList from './tabs/transfer-out-tab.component';
import PatientTracingList from '../partner-notification-services/tabs/patient-tracing.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const ProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs type="container">
        <Tab label={t('hivEnrollment', 'HIV Enrolment')}>
          <HIVEnrolmentTabList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('artTherapy', 'ART Therapy')} style={{ padding: 0 }}>
          <ArtTherapyTabList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('serviceDeliveryModel', 'Service Delivery Model')} style={{ padding: 0 }}>
          <ServiceDeliveryTabList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('transferOut', 'Transfer - Out')} style={{ padding: 0 }}>
          <TransferOutTabList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('patientTracing', 'Patient Tracing')} style={{ padding: 0 }}>
          <PatientTracingList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('death', 'Death')} style={{ padding: 0 }}>
          <DeathTabList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProgramManagementSummary;
