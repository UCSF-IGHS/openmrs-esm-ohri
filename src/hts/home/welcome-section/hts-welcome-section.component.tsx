import React from 'react';
import styles from './hts-welcome-section.scss';
import { Calendar32 } from '@carbon/icons-react';
import { Column, Row } from 'carbon-components-react';

function HtsWelcomeSection() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>OHRI Health Clinic</div>
      <div className={styles.welcomeDetails}>
        <div className={styles.userWelcome}>Welcome back, username</div>
        <div className={styles.currentDate}>
          <Calendar32 className={styles.calendarIcon} />
          16 June 2021
        </div>
      </div>
    </div>
  );
}

export default HtsWelcomeSection;
