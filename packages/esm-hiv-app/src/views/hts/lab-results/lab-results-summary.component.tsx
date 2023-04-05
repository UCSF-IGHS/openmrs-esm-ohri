import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import styles from '../lab-results/tabs/patient-list.scss';
import CD4ResultsList from './tabs/cd4-results.component';
import ViralLoadResultsList from './tabs/viral-load-results.component';
import { useTranslation } from 'react-i18next';

const LabResultsSummary = () => {
  const { t } = useTranslation();
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        <Tab>{t('cd4LabResults', 'CD4 Lab Results')}</Tab>
        <Tab>{t('viralLoadResults', 'Viral Load Results')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CD4ResultsList />
        </TabPanel>
        <TabPanel>
          <ViralLoadResultsList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LabResultsSummary;
