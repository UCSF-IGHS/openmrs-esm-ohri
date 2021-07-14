import { Column, Row } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import OHRISummaryTile from '../../../components/tile/ohri-summary-tile.component';
import {
  fetchPatientsLinkedToCareInLast14Days,
  fetchPositivePatientsInLast14Days,
  fetchTodayClients,
} from '../../../api/api';

function HTSSummaryTile() {
  const [todayPatientCount, setTodayPatientCount] = useState(0);
  const [positiveInLast14Days, setPositiveInLast14Days] = useState(0);
  const [linkedToCareInLast14Days, setLinkedToCareInLast14Days] = useState(0);
  const finalHIVCodeConcept = '6378487b-584d-4422-a6a6-56c8830873ff'; // dev
  const linkageToCareConcept = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // dev

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
    return fetchPositivePatientsInLast14Days(finalHIVCodeConcept).then(({ data }) => {
      setPositiveInLast14Days(data.total);
    });
  }

  function getLinkedToCareInLast14days() {
    return fetchPatientsLinkedToCareInLast14Days(linkageToCareConcept).then(({ data }) => {
      setLinkedToCareInLast14Days(data.total);
    });
  }

  return (
    <Row>
      {tile.map((name, index) => {
        return (
          // define a col
          <Column lg={4} md={3} sm={2}>
            <OHRISummaryTile details={name} />
          </Column>
        );
      })}
    </Row>
  );
}

export default HTSSummaryTile;
