import React from 'react';
import styles from './ohri-home.scss';
import { useTranslation } from 'react-i18next';
import { PatientList, PatientListDataTable } from '@ohri/openmrs-esm-ohri-commons-lib';

const OhriHome: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.ohriHomeContainer}>
      <PatientList />
      <PatientListDataTable />
    </div>
  );
};

export default OhriHome;
