import React from 'react';
import { Tile, Button } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import { styles } from './hts-summary-tile.scss';

function HtsSummaryTile() {
  const tiles = ['Today’s clients', 'Positive in last 14 days', 'Linked to care in last 14 days'];

  return tiles.map((title, index) => {
    <Tile className={styles.tile} key={index}>
      <div className={styles.tileContent}>
        <div className={styles.titleSection}>
          <div className={styles.titleTile}>{title}</div>
          <Button kind="ghost">
            View <ArrowRight32 />
          </Button>
        </div>
      </div>
    </Tile>;
  });
}

export default HtsSummaryTile;
