import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import CaCxRegistrationList from './Tabs/cacx-registration.component';
import CacxTreatmentList from './Tabs/cacx-treatment.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const CaCxCervicalCancerServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-12rem">{t('cacxRegistration', 'Cacx Registration')}</Tab>
          <Tab>{t('cacxTreatment', 'CaCx Treatment')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CaCxRegistrationList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <CacxTreatmentList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CaCxCervicalCancerServices;
