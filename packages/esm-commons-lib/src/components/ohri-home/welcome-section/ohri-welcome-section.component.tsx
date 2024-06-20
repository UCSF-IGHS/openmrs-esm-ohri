import React from 'react';
import { Calendar } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';

import styles from './ohri-welcome-section.scss';

interface OHRIWelcomeSectionProps {
  title: string;
  icon?: React.ReactNode;
}

export const OHRIWelcomeSection: React.FC<OHRIWelcomeSectionProps> = ({ title, icon }) => {
  const userSession = useSession();
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeIcon}>{icon}</div>
      <div className={styles.welcomeDetails}>
        <div className={styles.location}>{userSession?.sessionLocation.display}</div>
        <div className={styles.dashboardDetails}>
          <div className={styles.dashboardTitle}>{title}</div>
          <div className={styles.currentDate}>
            <Calendar size={32} className={styles.calendarIcon} />
            {new Date().toLocaleDateString() + ''}
          </div>
        </div>
      </div>
    </div>
  );
};
