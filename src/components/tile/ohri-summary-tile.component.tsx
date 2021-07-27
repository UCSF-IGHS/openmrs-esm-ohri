import React from 'react';
import { Button, Tile } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import styles from './ohri-summary-tile.scss';

function OHRISummaryTile({ details }) {
  return (
    <Tile className={styles.tile}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div className={styles.tileTitle}>{details.title}</div>
        <div>
          <Button size="small" kind="ghost">
            View <ArrowRight32 style={{ width: '12px', height: '10px' }} />
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.tileSubTitle}>{details.subTitle}</div>
          <div className={styles.tileValue}>{details.value}</div>
        </div>
      </div>
    </Tile>
  );
}

export default OHRISummaryTile;
