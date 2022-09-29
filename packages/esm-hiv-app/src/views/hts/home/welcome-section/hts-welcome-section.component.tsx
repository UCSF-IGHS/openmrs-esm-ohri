import React, { useEffect } from 'react';
import styles from './hts-welcome-section.scss';
import { Calendar } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

function HtsWelcomeSection() {
  const { t } = useTranslation();
  const userSession = useSession();
  const welcomeMessage = t('welcome', 'Welcome back');

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>{t('ohriHealthClinic', 'OHRI Health Clinic')}</div>
      <div className={styles.welcomeDetails}>
        <div className={styles.userWelcome}>{`${welcomeMessage} ${userSession?.user['person'].display}`}</div>
        <div className={styles.currentDate}>
          <Calendar size={32} className={styles.calendarIcon} />
          {new Date().toLocaleDateString() + ''}
        </div>
      </div>
    </div>
  );
}

export default HtsWelcomeSection;
