import React from 'react';
import styles from './hts-welcome-section.scss';
import { Calendar32 } from '@carbon/icons-react';
import moment from 'moment';

function HtsWelcomeSection() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>OHRI Health Clinic</div>
      <div className={styles.welcomeDetails}>
        <span className={styles.userWelcome}>Welcome back, username</span>
        <div className={styles.currentDate}>
          <Calendar32 className={styles.calendarIcon} />
          {moment().format('DD MMMM YYYY')}
        </div>
      </div>
    </div>
  );
}

export default HtsWelcomeSection;
