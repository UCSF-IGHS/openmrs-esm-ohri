import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
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
      <Tabs>
        <TabList contained>
          <Tab>{t('hivEnrollment', 'HIV Enrolment')}</Tab>
          <Tab>{t('artTherapy', 'ART Therapy')}</Tab>
          <Tab>{t('serviceDeliveryModel', 'Service Delivery Model')}</Tab>
          <Tab>{t('transferOut', 'Transfer - Out')}</Tab>
          <Tab>{t('patientTracing', 'Patient Tracing')}</Tab>
          <Tab>{t('death', 'Death')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HIVEnrolmentTabList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ArtTherapyTabList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ServiceDeliveryTabList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <TransferOutTabList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PatientTracingList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <DeathTabList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProgramManagementSummary;
