import { age } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import React from 'react';
import styles from './patient-banner.scss';

export const PatientBanner: React.FC<{ patient: any }> = ({ patient }) => {
  const getPatientNames = () => {
    return `${patient.name[0].given.join(' ')} ${patient.name[0].family}`;
  };
  return (
    <div className={styles.headerWrapper}>
      <div className={`${styles.column} ${styles.demo}`}>
        <div className={styles.row}>
          <span className={styles.name}>{getPatientNames()}</span>
        </div>
        <div className={`${styles.row} ${styles.details}`}>
          <span>
            {capitalize(patient.gender)} &middot; {age(patient.birthDate)} &middot;{' '}
            {dayjs(patient.birthDate).format('DD - MMM - YYYY')}
          </span>
        </div>
      </div>
      <div className={styles.vl}></div>
      <div className={`${styles.column} ${styles.weight}`}>
        <div className={`${styles.row} ${styles.weightLabel}`}>
          <span>Weight</span>
        </div>
        <div className={styles.row}>
          <span className={styles.weightValue}>60</span>
          <span className={styles.weightUnit}>kg</span>
        </div>
      </div>
      <div className={`${styles.column} ${styles.allergies}`}>
        <div className={styles.row}>
          <span className={styles.allergiesLabel}>Allergies</span>
        </div>
        <div className={styles.row}>
          <span className={styles.allergiesValue}>Peanuts, Fructose</span>
        </div>
      </div>
    </div>
  );
};
