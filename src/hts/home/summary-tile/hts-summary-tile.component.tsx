import { Column, Row } from 'carbon-components-react';
import React, { useState } from 'react';
import OHRISummaryTileTablet from '../../../components/tile/ohri-summary-tile-tablet.component';
import OHRISummaryTile from '../../../components/tile/ohri-summary-tile.component';
import styles from './summary-tile.scss';

function HTSSummaryTile() {
  // const [tiles, setTiles] = useState(['Today’s clients', 'Positive in last 14 days', 'Linked to care in last 14 days'])

  const tile = [
    {
      title: 'Test',
      linkAddres: '#',
      subTitle: 'Test Sub',
      value: 45,
    },
    {
      title: 'Test 2',
      linkAddres: '#',
      subTitle: 'Test Sub',
      value: 46,
    },
    {
      title: 'Test 3',
      linkAddres: '#',
      subTitle: 'Test Sub',
      value: 43,
    },
  ];

  return (
    <>
      <Row className={styles.desktopView}>
        {tile.map((name, index) => {
          return (
            <Column lg={4} md={3} sm={2} key={index}>
              <OHRISummaryTile details={name} />
            </Column>
          );
        })}
      </Row>
      <Row className={styles.tileView}>
        <OHRISummaryTileTablet details={tile} />
      </Row>
    </>
  );
}

export default HTSSummaryTile;
