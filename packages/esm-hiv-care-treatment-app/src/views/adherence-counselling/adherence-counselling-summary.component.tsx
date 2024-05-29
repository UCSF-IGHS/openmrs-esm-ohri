import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import AdherenceCounsellingList from './tabs/adherence-counselling.component';
import EnhancedAdherenceCounsellingList from './tabs/enhanced-adherence-counselling.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const AdherenceCounsellingSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-12rem">{t('adherenceCounselling', 'Adherence Counselling')}</Tab>
          <Tab className="tab-16rem">{t('enhancedAdherenceCounselling', 'Enhanced Adherence Counselling')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdherenceCounsellingList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <EnhancedAdherenceCounsellingList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AdherenceCounsellingSummary;
