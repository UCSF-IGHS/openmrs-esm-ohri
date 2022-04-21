import React from 'react';
import { Button, Tile } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import styles from './ohri-summary-tile.scss';

const OHRISummaryTile: React.FC<OHRISummaryTileProps> = ({ title, subTitle, value, onClickView }) => {
  return (
    <Tile className={styles.tile}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div className={styles.tileTitle}>{title}</div>
        <div>
          {onClickView && (
            <Button size="small" kind="ghost" onClick={onClickView}>
              View <ArrowRight32 style={{ width: '12px', height: '10px' }} />
            </Button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.tileSubTitle}>{subTitle}</div>
          <div className={styles.tileValue}>{value}</div>
        </div>
      </div>
    </Tile>
  );
};

export interface OHRISummaryTileProps {
  title: string;
  subTitle: string;
  value: number;
  onClickView: () => void;
}

export default OHRISummaryTile;
