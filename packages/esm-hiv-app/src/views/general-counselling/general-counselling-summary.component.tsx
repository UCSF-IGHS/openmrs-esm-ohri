import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
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
      <Tabs>
        <TabList contained>
          <Tab className="tab-14rem">{t('mentalHealthAssessment', 'Mental Health Assessment')}</Tab>
          <Tab className="tab-12rem">{t('drugsAndAlcoholUse', 'Drugs and Alcohol Use')}</Tab>
          <Tab className="tab-14rem">{t('intimatePartnerViolence', 'Intimate Partner Violence')}</Tab>
          <Tab>{t('disclosure', 'Disclosure')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MentalHealthAssessmentList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <DrugsAndAlcoholUseList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <IntimatePartnerViolenceList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <DisclosureList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default GeneralCounsellingSummary;
