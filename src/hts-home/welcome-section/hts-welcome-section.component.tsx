import React from 'react';
import styles from './hts-welcome-section.scss';

function HtsWelcomeSection() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>OHRI Health Clinic</div>
      <div className={styles.welcomeDetails}>
        <div className={styles.userWelcome}>Welcome back, username</div>
        <div className={styles.currentDate}>{/* get current date */}</div>
      </div>
    </div>
  );
}

export default HtsWelcomeSection;
