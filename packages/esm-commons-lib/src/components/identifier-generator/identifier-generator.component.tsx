import React from 'react';
import { Renew } from '@carbon/react/icons';
import styles from './identifier-generator.scss';

export const IdentifierGenerator: React.FC = () => {
  const generateId = () => {};
  return (
    <div>
      <span className={styles.idLabel}>Unique HTS Number (generated)</span>
      <div className={styles.container}>
        <div style={{ width: '50%' }}>
          <span className={styles.idText}>00008962B-12</span>
        </div>
        <div>
          <Renew size={32} className={(styles.rotate, styles.renewSVG)} onClick={generateId} />
        </div>
      </div>
    </div>
  );
};
