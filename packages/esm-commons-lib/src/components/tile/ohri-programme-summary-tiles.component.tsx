import { Row } from '@carbon/react';
import React from 'react';
import { OHRISummaryTileTablet } from './ohri-summary-tile-tablet.component';
import styles from './ohri-programme-summary-tiles.scss';
import { OHRISummaryTile } from './ohri-summary-tile.component';

export interface SummaryTile {
  title: string;
  linkAddress: string;
  subTitle: string;
  value: number;
  onClick: () => void;
}

export function OHRIProgrammeSummaryTiles(Props) {
  return (
    <>
      <div className={styles.desktopView}>
        {Props.tiles.map((tile, index) => {
          return (
            <div style={{ width: '321px' }} key={index}>
              <OHRISummaryTile
                title={tile.title}
                subTitle={tile.subTitle}
                value={tile.value}
                onClickView={tile.onClick}
              />
            </div>
          );
        })}
      </div>
      <Row className={styles.tileView}>
        <OHRISummaryTileTablet details={Props.tiles} />
      </Row>
    </>
  );
}
