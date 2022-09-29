import React, { useEffect } from 'react';
import { Tabs, Tab } from '@carbon/react';
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
      <Tabs type="container">
        <Tab label={t('cd4LabResults', 'CD4 Lab results')} style={{ padding: 0 }}>
          <CD4OverviewList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('viralLoad', 'Viral Load')}>
          <LabResultsOverviewList patientUuid={patientUuid} />
        </Tab>
        <Tab label={t('labTests', 'Lab Tests')} style={{ padding: 0 }}>
          <div className={styles.padding}>
            <ExtensionSlot
              extensionSlotName="ohri-lab-test-result-filtered-overview-slot"
              state={{ patientUuid, filter }}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default LabResultsOverview;
