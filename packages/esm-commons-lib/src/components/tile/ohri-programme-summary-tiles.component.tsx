import { Row } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
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

interface Props {
  tiles: Array<SummaryTile>;
}

export function OHRIProgrammeSummaryTiles(Props) {
  return (
    <>
      <Row className={styles.desktopView}>
        {Props.tiles.map((tile, index) => {
          return (
            <div style={{ width: '321px', marginLeft: '16px' }} key={index}>
              <OHRISummaryTile
                title={tile.title}
                subTitle={tile.subTitle}
                value={tile.value}
                onClickView={tile.onClick}
              />
            </div>
          );
        })}
      </Row>
      <Row className={styles.tileView}>
        <OHRISummaryTileTablet details={Props.tiles} />
      </Row>
    </>
  );
}
