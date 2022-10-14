import React, { useEffect } from 'react';
import styles from './ohri-welcome-section.scss';
import { Calendar32 } from '@carbon/icons-react';
import { useSession } from '@openmrs/esm-framework';

export function OHRIWelcomeSection({ title }) {
  const userSession = useSession();
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>{title}</div>
      <div className={styles.welcomeDetails}>
        <div className={styles.userWelcome}>Welcome back {userSession?.user['person'].display}</div>
        <div className={styles.currentDate}>
          <Calendar32 className={styles.calendarIcon} />
          {new Date().toLocaleDateString() + ''}
        </div>
      </div>
    </div>
  );
}
