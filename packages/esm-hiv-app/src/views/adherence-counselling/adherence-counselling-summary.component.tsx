import React from 'react';
import { Tabs, Tab } from '@carbon/react';
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
      <Tabs type="container">
        <Tab label={t('adherenceCounselling', 'Adherence Counselling')} className="tab-12rem">
          <AdherenceCounsellingList patientUuid={patientUuid} />
        </Tab>
        <Tab
          label={t('enhancedAdherenceCounselling', 'Enhanced Adherence Counselling')}
          className="tab-16rem"
          style={{ padding: 0 }}
        >
          <EnhancedAdherenceCounsellingList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdherenceCounsellingSummary;
