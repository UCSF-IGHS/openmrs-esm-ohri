import React from 'react';
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@carbon/react';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const TbHomePatientTabs: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <Tabs >
      <TabList contained>
        <Tab>{t('allTBClients', 'All TB Clients')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TbHomePatientTabs;