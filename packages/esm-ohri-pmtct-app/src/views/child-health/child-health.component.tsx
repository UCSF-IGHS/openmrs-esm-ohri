import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import { useTranslation } from 'react-i18next';
import HieOutcomesList from './tabs/hie-outcome.component';
import HieVisitsList from './tabs/hie-visits.component';
import InfantPostnatalList from './tabs/infant-postnatal-care.component';

interface OverviewListProps {
  patientUuid: string;
}

const ChildHealthList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>{t('HieVisits', 'HIE Visits')}</Tab>
          <Tab>{t('HieOutcomes', 'HIE Outcomes')}</Tab>
          <Tab>{t('infantPostnatalCare', 'Infant Postnatal Care')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HieVisitsList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <HieOutcomesList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <InfantPostnatalList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ChildHealthList;
