import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import styles from '../summary-tabs/ohri-patient-tabs.scss';
// import CD4ResultsList from './Tabs/cd4-results.component';
// import ViralLoadResultsList from './Tabs/viral-load-results.component';
import { useTranslation } from 'react-i18next';
import AllClients from './all-clients.component';
import AntentalList from './antenatal.component';
import DeliveryList from './delivery.component';
import PostnatalList from './postnatal.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        <Tab>{t('allClients', 'All Clients')}</Tab>
        <Tab>{t('antenatal', 'Antenatal')}</Tab>
        <Tab>{t('delivery', 'Delivery')}</Tab>
        <Tab>{t('postnatal', 'Postnatal')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AllClients patientUuid={patientUuid} />
        </TabPanel>
        <TabPanel>
          <AntentalList patientUuid={patientUuid} />
        </TabPanel>
        <TabPanel>
          <DeliveryList patientUuid={patientUuid} />
        </TabPanel>
        <TabPanel>
          <PostnatalList patientUuid={patientUuid} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LabResultsSummary;
