import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import { useTranslation } from 'react-i18next';
import HIVTestingTabList from './tab-list/hiv-testing.component';

interface OverviewListProps {
  patientUuid: string;
}

const HTSPreventionSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-16rem">{t('HtsPreTest', 'HIV Testing')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HIVTestingTabList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HTSPreventionSummary;
