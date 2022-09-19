import React, { useState } from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import styles from '../lab-results/Tabs/patient-list.scss';
import CD4ResultsList from './Tabs/cd4-results.component';
import ViralLoadResultsList from './Tabs/viral-load-results.component';
import LabResultsSummaryTiles from './lab-results-summary-tiles.component';
import { useTranslation } from 'react-i18next';

interface OverviewListProps {
  patientUuid: string;
}

const LabResultsSummary: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    // <div className={styles.tabContainer}>
    <Tabs type="container" className={styles.tabContainer}>
      <Tab label={t('cd4LabResults', 'CD4 Lab Results')} className="tab-14rem">
        <CD4ResultsList patientUuid={patientUuid} />
      </Tab>
      <Tab label={t('viralLoadResults', 'Viral Load Results')} className="tab-12rem" style={{ padding: 0 }}>
        <ViralLoadResultsList patientUuid={patientUuid} />
      </Tab>
    </Tabs>
    // </div>
  );
};

export default LabResultsSummary;
