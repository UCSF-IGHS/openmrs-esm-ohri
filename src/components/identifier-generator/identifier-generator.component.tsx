import React from 'react';
import { Renew32 } from '@carbon/icons-react';
import styles from './identifier-generator.scss';

interface IdentifierGeneratorProps {
  generateId?: any;
}

export const IdentifierGenerator: React.FC<IdentifierGeneratorProps> = props => {
  return (
    <div>
      <span data-testid="unique-title" className={styles.idLabel}>
        Unique HTS Number (generated)
      </span>
      <div className={styles.container}>
        <div style={{ width: '50%' }}>
          <span className={styles.idText}>00008962B-12</span>
        </div>
        <div>
          <Renew32 data-testid="renew-click" className={(styles.rotate, styles.renewSVG)} onClick={props.generateId} />
        </div>
      </div>
    </div>
  );
};
