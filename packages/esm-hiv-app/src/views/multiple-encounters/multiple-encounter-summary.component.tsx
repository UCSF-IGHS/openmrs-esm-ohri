import { Tabs, Tab } from 'carbon-components-react';
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
    <div className={styles.tabContainer} style={{ position: 'relative', width: '1800px' }}>
      <Tabs type="container">
        <Tab label={t('hivBaseline', 'HIV Baseline')}>
          <HivBaselineTabList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MultipleEncountersSummary;
