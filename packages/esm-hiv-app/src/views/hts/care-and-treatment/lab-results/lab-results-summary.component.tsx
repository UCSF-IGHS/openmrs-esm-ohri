import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import styles from '../lab-results/Tabs/patient-list.scss';
import CD4ResultsList from './Tabs/cd4-results.component';
import ViralLoadResultsList from './Tabs/viral-load-results.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <Tabs type="container" className={styles.tabContainer}>
      <TabList contained>
        <Tab>{t('cd4LabResults', 'CD4 Lab Results')}</Tab>
        <Tab>{t('viralLoadResults', 'Viral Load Results')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel><CD4ResultsList patientUuid={patientUuid} /></TabPanel>
        <TabPanel><ViralLoadResultsList patientUuid={patientUuid} /></TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default LabResultsSummary;
