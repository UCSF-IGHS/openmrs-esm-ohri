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
      value: positiveInLast14Days,
    },
    {
      title: 'Linked to care in last 14 days',
      linkAddress: '#',
      subTitle: 'Last 14 days',
      value: linkedToCareInLast14Days,
    },
  ];

  useEffect(() => {
    getTodayClientCount();
    getPositiveInLast14days();
    getLinkedToCareInLast14days();
  });

  function getTodayClientCount() {
    return fetchTodayClients().then(({ data }) => {
      setTodayPatientCount(data.total);
    });
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
    <Row>
      {tile.map((name, index) => {
        return (
          <Column lg={4} md={3} sm={1} key={index}>
            <OHRISummaryTile details={name} />
          </Column>
        );
      })}
    </Row>
  );
}

export default HTSSummaryTile;
