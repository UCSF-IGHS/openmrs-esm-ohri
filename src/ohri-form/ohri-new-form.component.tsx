import React from 'react';
import styles from './ohri-new-form.scss';

function OhriNewForm() {
  return (
    <div id={styles.wrapper}>
      <div className={styles.header}>Header</div>
      <div>
        <div className={styles.leftpanel}>Left Panel</div>
        <div className={styles.rightpanel}>Right Panel</div>
      </div>
    </div>
  );
}

export default OhriNewForm;
