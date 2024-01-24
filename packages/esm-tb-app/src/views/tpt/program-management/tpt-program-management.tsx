import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../../common.scss';
import { useTranslation } from 'react-i18next';
import TptTreatmentList from './tabs/tpt-treatment.component copy';
import TptEnrolmentList from './tabs/tpt-enrolment.component';
import { PatientChartProps } from '@ohri/openmrs-esm-ohri-commons-lib';

const TptProgramManagementSummary: React.FC<PatientChartProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>{t('tptEnrolment', 'TPT Enrolment')}</Tab>
          <Tab>{t('tptTreatment', 'TPT Treatment')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TptEnrolmentList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <TptTreatmentList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TptProgramManagementSummary;
