import React, { useEffect } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import CD4OverviewList from '../cd4/cd4-encounter-list.component';
import styles from './lab-results-overview.scss';
import LabResultsOverviewList from '../encounter-list/lab-results-encounter-list.component';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';
import { ExternalOverviewProps } from '@openmrs/esm-patient-common-lib';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsOverview: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const filter = React.useMemo<ExternalOverviewProps['filter']>(() => {
    return () => true;
  }, []);

  useEffect(() => {
    attach('ohri-lab-test-result-filtered-overview-slot', 'test-results-filtered-overview');
    return () => {
      detach('ohri-lab-test-result-filtered-overview-slot', 'test-results-filtered-overview');
    };
  }, []);

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>{t('cd4LabResults', 'CD4 Lab results')}</Tab>
          <Tab>{t('viralLoad', 'Viral Load')}</Tab>
          <Tab>{t('labTests', 'Lab Tests')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CD4OverviewList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <LabResultsOverviewList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <div className={styles.padding}>
              <ExtensionSlot
                extensionSlotName="ohri-lab-test-result-filtered-overview-slot"
                state={{ patientUuid, filter }}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default LabResultsOverview;
