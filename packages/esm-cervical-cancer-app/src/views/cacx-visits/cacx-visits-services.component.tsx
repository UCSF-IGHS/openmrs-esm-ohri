import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import { useTranslation } from 'react-i18next';
import { CacxTreatment } from './tabs/cacx-treatment.component';
import { CacxRegistration } from './tabs/cacx-registration.component';

interface OverviewListProps {
  patientUuid: string;
}

const CaCxCervicalCancerServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-12rem">{t('cacxRegistration', 'CaCx Registration')}</Tab>
          <Tab>{t('cacxTreatment', 'CaCx Treatment')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CacxRegistration patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CacxTreatment patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CaCxCervicalCancerServices;
