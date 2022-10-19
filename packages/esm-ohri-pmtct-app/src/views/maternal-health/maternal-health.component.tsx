import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import MnchEnrolmentList from './tabs/mnch-enrolment.component';

import { useTranslation } from 'react-i18next';
import AntenatalCareList from './tabs/antenatal-care.component';
import LabourDeliveryList from './tabs/labour-delivery.component';
import PostnatalCareList from './tabs/postnatal-care.component';
import PregnancyOutcomeList from './tabs/pregnancy-outcome.component';

interface OverviewListProps {
  patientUuid: string;
}

const MaternalHealthList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>{t('MnchEnrolment', 'Mnch Enrolment')}</Tab>
          <Tab>{t('AntenatalCare', 'Antenatal Care')}</Tab>
          <Tab>{t('LabourDeliver', 'Labour & Delivery')}</Tab>
          <Tab>{t('PostnatalCare', 'Postnatal Care')}</Tab>
          <Tab>{t('PregnancyOutcome', 'Pregnancy Outcome')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MnchEnrolmentList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <AntenatalCareList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <LabourDeliveryList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PostnatalCareList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <PregnancyOutcomeList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MaternalHealthList;
