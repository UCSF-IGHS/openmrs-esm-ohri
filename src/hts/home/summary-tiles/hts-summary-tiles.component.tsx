import { Column, Row } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import OHRISummaryTile from '../../../components/tile/ohri-summary-tile.component';
import { fetchTodayClients, fetchObservationsFromCodeConcept } from '../../../api/api';
import {
  finalHIVCodeConcept,
  finalPositiveHIVValueConcept,
  linkedToCareCodeConcept,
  linkedToCareYesValueConcept,
} from '../../../constants';
import { TodayzClientList } from './today-client-list-tile.component';
import OHRISummaryTileTablet from '../../../components/tile/ohri-summary-tile-tablet.component';
import styles from './summary-tile.scss';

function HTSSummaryTiles({ launchWorkSpace }) {
  const [todayPatientCount, setTodayPatientCount] = useState(0);
  const [positiveInLast14Days, setPositiveInLast14Days] = useState(0);
  const [linkedToCareInLast14Days, setLinkedToCareInLast14Days] = useState(0);

  const tiles = [
    {
      title: "Today's Clients",
      linkAddress: '#',
      subTitle: 'Active Visits',
      value: todayPatientCount,
      onClick: () => {
        launchWorkSpace("Today's clients", <TodayzClientList />);
      },
    },
    {
      title: 'Positive in last 14 days',
      linkAddress: '#',
      subTitle: 'Clients',
      value: positiveInLast14Days,
      onClick: () => {
        launchWorkSpace('Positive in last 14 days', <p>TODO: Add list</p>);
      },
    },
    {
      title: 'Linked to care in last 14 days',
      linkAddress: '#',
      subTitle: 'Last 14 days',
      value: linkedToCareInLast14Days,
      onClick: () => {
        launchWorkSpace('Linked to care in last 14 days', <p>TODO: Add list</p>);
      },
    },
  ];

  useEffect(() => {
    getTodayClientCount();
    getPositiveInLast14days();
    getLinkedToCareInLast14days();
  });

  function getTodayClientCount() {
    // return fetchTodayClients().then(({ data }) => {
    //   setTodayPatientCount(data.total);
    // });
  }

  function getPositiveInLast14days() {
    return fetchObservationsFromCodeConcept(finalHIVCodeConcept, finalPositiveHIVValueConcept, 14).then(({ data }) => {
      setPositiveInLast14Days(data.total);
    });
  }

  function getLinkedToCareInLast14days() {
    return fetchObservationsFromCodeConcept(linkedToCareCodeConcept, linkedToCareYesValueConcept, 14).then(
      ({ data }) => {
        setLinkedToCareInLast14Days(data.total);
      },
    );
  }

  return (
    <>
      <Row className={styles.desktopView}>
        {tiles.map((tile, index) => {
          return (
            <Column lg={4} md={3} sm={1} key={index}>
              <OHRISummaryTile
                title={tile.title}
                subTitle={tile.subTitle}
                value={tile.value}
                onClickView={tile.onClick}
              />
            </Column>
          );
        })}
      </Row>
      <Row className={styles.tileView}>
        <OHRISummaryTileTablet details={tiles} />
      </Row>
    </>
  );
}

export default HTSSummaryTiles;
