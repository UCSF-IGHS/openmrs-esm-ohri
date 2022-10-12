import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import ClinicalVisitList from './tabs/clinical-visit-tab.component';
import ExpressVisitList from './tabs/express-visit-tab.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const VisitsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>{t('clinicalVisit', 'Clinical Visit')}</Tab>
          <Tab>{t('expressVisit', 'Express Visit')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ClinicalVisitList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ExpressVisitList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default VisitsSummary;
