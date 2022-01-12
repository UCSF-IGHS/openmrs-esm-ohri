import React, { useEffect, useState } from 'react';
import { fetchTodayClients, fetchPatientsFromObservationCodeConcept } from '../../../api/api';
import {
  finalHIVCodeConcept,
  finalPositiveHIVValueConcept,
  linkedToCareCodeConcept,
  linkedToCareYesValueConcept,
} from '../../../constants';
import { TodaysClientList } from './today-client-list-tile.component';
import { PositiveInLast14Days } from './positive-in-last-14-days-list-tile.component';
import { LinkedToCareInLast14Days } from './linked-to-care-in-last-14-days-list-tile.component';
import OHRIProgrammeSummaryTiles from '../../../components/tile/ohri-programme-summary-tiles.component';

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

  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default HTSSummaryTiles;
