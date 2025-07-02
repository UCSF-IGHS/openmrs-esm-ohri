import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { PatientList } from '@ohri/openmrs-esm-ohri-commons-lib';
import styles from './ohri-patient-tabs.scss';

const MotherChildSummary: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Tabs>
      <TabList contained aria-label="">
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

export default MotherChildSummary;
