import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';
import { useTranslation } from 'react-i18next';
import MdrTbList from './tabs/mdr-tb.component';
import TbPatientTracing from './tabs/tb-patient-tracing.component';

interface OverviewListProps {
  patientUuid: string;
}

const ProgramManagementSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>{t('MdrTbEnrolment')}</Tab>
          <Tab>{t('PatientTracing')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MdrTbList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <TbPatientTracing patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProgramManagementSummary;
