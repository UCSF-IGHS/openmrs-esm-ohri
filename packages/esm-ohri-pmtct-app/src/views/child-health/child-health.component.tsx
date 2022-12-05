import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import { useTranslation } from 'react-i18next';
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
          <Tab>{t('infantPostnatalVisit', 'Infant Postnatal Visit')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InfantPostnatalList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ChildHealthList;
