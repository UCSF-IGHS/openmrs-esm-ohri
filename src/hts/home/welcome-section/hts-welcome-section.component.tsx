import React from 'react';
import styles from './hts-welcome-section.scss';
import { Calendar32 } from '@carbon/icons-react';
import { Column, Row } from 'carbon-components-react';

function HtsWelcomeSection({ tile }) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.welcome}>OHRI Health Clinic</div>
      <div className={styles.welcomeDetails}>
        <div className={styles.userWelcome}>Welcome back, username</div>
        <div className={styles.currentDate}>
          <Calendar32 />
          16 June 2021
        </div>
      </div> */}
      <Row className={styles.welcome}>OHRI Health Clinic</Row>
      <Row className={styles.welcomeDetails}>
        <Column lg={6} md={6} sm={2} className={styles.userWelcome}>
          Welcome back, username
        </Column>
        <Column lg={6} md={6} sm={2} className={styles.currentDate}>
          <Calendar32 className={styles.calendarIcon} />
          16 June 2021
        </Column>
      </Row>
    </div>
  );
}

export default HtsWelcomeSection;
