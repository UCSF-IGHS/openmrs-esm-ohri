import React from 'react';
import { Button, Tile } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import styles from './ohri-summary-tile.scss';

export const OHRISummaryTile: React.FC<OHRISummaryTileProps> = ({ title, subTitle, value, onClickView }) => {
  return (
    <Tile className={styles.tile}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div className={styles.tileTitle}>{title}</div>
        <div>
          {onClickView && (
            <Button size="small" kind="ghost" onClick={onClickView}>
              View <ArrowRight size={32} style={{ width: '12px', height: '10px' }} />
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
