import { Column, Row } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import OHRISummaryTileTablet from '../../../components/tile/ohri-summary-tile-tablet.component';
import OHRISummaryTile from '../../../components/tile/ohri-summary-tile.component';
import styles from './summary-tile.scss';
import { fetchTodayClients } from '../../../api/api';

function HTSSummaryTile() {
  const [todayPatientCount, setTodayPatientCount] = useState(0);
  const [positiveInLast14Days, setPositiveInLast14Days] = useState(0);
  const [linkedToCareInLast14Days, setLinkedToCareInLast14Days] = useState(0);

  const tile = [
    {
      title: "Today's Clients",
      linkAddress: '#',
      subTitle: 'Active Visits',
      value: todayPatientCount,
    },
    {
      title: 'Positive in last 14 days',
      linkAddress: '#',
      subTitle: 'Clients',
      value: 46,
    },
    {
      title: 'Linked to care in last 14 days',
      linkAddress: '#',
      subTitle: 'Last 14 days',
      value: 43,
    },
  ];

  useEffect(() => {
    getTodayClientCount();
  });

  function getTodayClientCount() {
    return fetchTodayClients().then(({ data }) => {
      setTodayPatientCount(data.total);
    });
  }

  function getPositiveInLast14days() {
    return fetchTodayClients().then(({ data }) => {
      setTodayPatientCount(data.total);

      // const { entry: encounters } = openmrsFetch(`/ws/fhir2/R4/Encounter?date=${date}`);
      // return encounters.total;
    });
  }

  function getLinkedToCareInLast14days() {
    return fetchTodayClients().then(({ data }) => {
      setTodayPatientCount(data.total);

      // const { entry: encounters } = openmrsFetch(`/ws/fhir2/R4/Encounter?date=${date}`);
      // return encounters.total;
    });
  }

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
