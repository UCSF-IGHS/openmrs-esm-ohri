import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import HtsOverviewList from './tab-list/hts-overview-list.component';
import ServiceDeliveryTabList from './tab-list/pre-test.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const HTSPreventionSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-12rem">{t('HtsPreTest', 'Pre Test')}</Tab>
          <Tab className="tab-16rem">{t('HtsHivTesting', 'HIV Testing')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HtsOverviewList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ServiceDeliveryTabList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HTSPreventionSummary;
