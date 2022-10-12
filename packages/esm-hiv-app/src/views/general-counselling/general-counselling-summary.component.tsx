import React from 'react';
import { Tabs, Tab } from '@carbon/react';
import styles from '../common.scss';
import MentalHealthAssessmentList from './tabs/mental-health-assessment.component';
import DrugsAndAlcoholUseList from './tabs/drugs-and-alcohol-use.component';
import IntimatePartnerViolenceList from './tabs/intimate-partner-violence.component';
import DisclosureList from './tabs/disclosure.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const GeneralCounsellingSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabContainer}>
      <Tabs type="container">
        <Tab label={t('mentalHealthAssessment', 'Mental Health Assessment')} className="tab-14rem">
          <MentalHealthAssessmentList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('drugsAndAlcoholUse', 'Drugs and Alcohol Use')} className="tab-12rem" style={{ padding: 0 }}>
          <DrugsAndAlcoholUseList patientUuid={patientUuid} />
        </Tab>
        <Tab
          label={t('intimatePartnerViolence', 'Intimate Partner Violence')}
          className="tab-14rem"
          style={{ padding: 0 }}
        >
          <IntimatePartnerViolenceList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('disclosure', 'Disclosure')} style={{ padding: 0 }}>
          <DisclosureList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default GeneralCounsellingSummary;
