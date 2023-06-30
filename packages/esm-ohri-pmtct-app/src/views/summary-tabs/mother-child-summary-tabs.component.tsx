import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import styles from '../summary-tabs/ohri-patient-tabs.scss';
import { useTranslation } from 'react-i18next';
import AllClients from './all-clients.component';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        <Tab>{t('allClients', 'All Clients')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AllClients patientUuid={patientUuid} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LabResultsSummary;
