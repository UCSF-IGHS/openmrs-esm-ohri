import React from 'react';
import { Renew32 } from '@carbon/icons-react';
import styles from './identifier-generator.scss';

export const IdentifierGenerator: React.FC = () => {
  return (
    <div>
      <span className={styles.idLabel}>Unique HTS Number</span>
      <div className={styles.container}>
        <div style={{ width: '50%' }}>
          <span className={styles.idText}>00008962B-12</span>
        </div>
        <div>
          <Renew32 className={(styles.rotate, styles.renewSVG)} onClick={event => alert('clicked')} />
        </div>
      </div>
    </div>
  );
};
