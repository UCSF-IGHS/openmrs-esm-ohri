import { Column, Row } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import OHRISummaryTile from '../../../components/tile/ohri-summary-tile.component';
import { fetchTodayClients, fetchPatientsFromObservationCodeConcept } from '../../../api/api';
import {
  finalHIVCodeConcept,
  finalPositiveHIVValueConcept,
  linkedToCareCodeConcept,
  linkedToCareYesValueConcept,
} from '../../../constants';
import OHRISummaryTileTablet from '../../../components/tile/ohri-summary-tile-tablet.component';
import styles from './summary-tile.scss';
import { TodaysClientList } from './today-client-list-tile.component';
import { PositiveInLast14Days } from './positive-in-last-14-days-list-tile.component';
import { LinkedToCareInLast14Days } from './linked-to-care-in-last-14-days-list-tile.component';

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
        launchWorkSpace("Today's clients", <TodaysClientList />, {
          numberOfClients: todayPatientCount,
          subTitle: "Today's clients",
          dateLastUpdated: '--',
        });
      },
    },
    {
      title: 'Positive in last 14 days',
      linkAddress: '#',
      subTitle: 'Clients',
      value: positiveInLast14Days,
      onClick: () => {
        launchWorkSpace('Positive in last 14 days', <PositiveInLast14Days />, {
          numberOfClients: positiveInLast14Days,
          subTitle: 'Clients who tested positive in the last 14 days',
          dateLastUpdated: '--',
        });
      },
    },
    {
      title: 'Linked to care in last 14 days',
      linkAddress: '#',
      subTitle: 'Last 14 days',
      value: linkedToCareInLast14Days,
      onClick: () => {
        launchWorkSpace('Linked to care in last 14 days', <LinkedToCareInLast14Days />, {
          numberOfClients: linkedToCareInLast14Days,
          subTitle: 'Clients linked to care in the last 14 days',
          dateLastUpdated: '--',
        });
      },
    },
  ];

  useEffect(() => {
    getTodayClientCount();
    getPositiveInLast14days();
    getLinkedToCareInLast14days();
  });

  function getTodayClientCount() {
    return fetchTodayClients().then(response => {
      setTodayPatientCount(response.length);
    });
  }

  function getPositiveInLast14days() {
    return fetchPatientsFromObservationCodeConcept(finalHIVCodeConcept, finalPositiveHIVValueConcept, 14).then(
      response => {
        setPositiveInLast14Days(response.length);
      },
    );
  }

  function getLinkedToCareInLast14days() {
    return fetchPatientsFromObservationCodeConcept(linkedToCareCodeConcept, linkedToCareYesValueConcept, 14).then(
      response => {
        setLinkedToCareInLast14Days(response.length);
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
