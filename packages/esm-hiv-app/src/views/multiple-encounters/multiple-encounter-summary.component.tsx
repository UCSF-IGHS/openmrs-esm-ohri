import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../common.scss';
import HivBaselineTabList from './tabs/hiv-baseline-tab.component';

interface OverviewListProps {
  patientUuid: string;
}

const MultipleEncountersSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer} style={{ position: 'relative', minWidth: '50rem' }}>
      <Tabs>
        <TabList contained>
          <Tab>{t('hivBaseline', 'HIV Baseline')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HivBaselineTabList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MultipleEncountersSummary;
