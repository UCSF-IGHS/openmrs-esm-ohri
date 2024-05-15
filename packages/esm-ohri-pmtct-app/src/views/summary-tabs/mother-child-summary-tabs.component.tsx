import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import styles from '../summary-tabs/ohri-patient-tabs.scss';
import { useTranslation } from 'react-i18next';
import { PatientList } from '@ohri/openmrs-esm-ohri-commons-lib';

const LabResultsSummary: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        <Tab>{t('allClients', 'All Clients')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PatientList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LabResultsSummary;
