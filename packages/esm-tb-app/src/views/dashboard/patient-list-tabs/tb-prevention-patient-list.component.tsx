import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const TbPreventionPatientListTabs: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <Tabs>
      <TabList contained>
        <Tab>{t('allTptClients', 'All TPT Clients')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TbPreventionPatientListTabs;
