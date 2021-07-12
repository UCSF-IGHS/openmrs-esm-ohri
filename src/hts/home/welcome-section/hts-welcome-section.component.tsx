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
      <Row>
        <Column>
          {/* replace with username */}
          <div className={styles.userWelcome}>Welcome back, username</div>
        </Column>
        <Column>
          {/* replace with current date */}
          <div className={styles.currentDate}>
            <Calendar32 />
            16 June 2021
          </div>
        </Column>
      </Row>
    </div>
  );
}

export default HtsWelcomeSection;
