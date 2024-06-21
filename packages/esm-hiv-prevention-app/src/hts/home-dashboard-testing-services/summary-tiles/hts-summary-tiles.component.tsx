import React, { useEffect, useState } from 'react';
import {
  OHRISummaryTile,
  OHRISummaryTileTablet,
  fetchPatientsFromObservationCodeConcept,
  fetchTodayClients,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { Row } from '@carbon/react';
import { TodaysClientList } from './today-client-list-tile.component';
import { PositiveInLast14Days } from './positive-in-last-14-days-list-tile.component';
import { LinkedToCareInLast14Days } from './linked-to-care-in-last-14-days-list-tile.component';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@openmrs/esm-framework';

import styles from './hts-summary-tile.scss';

function HTSSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [todayPatientCount, setTodayPatientCount] = useState(0);
  const [positiveInLast14Days, setPositiveInLast14Days] = useState(0);
  const [linkedToCareInLast14Days, setLinkedToCareInLast14Days] = useState(0);
  const { obsConcepts } = useConfig();

  const tiles = [
    {
      title: t('todaysClients', "Today's Clients"),
      linkAddress: '#',
      subTitle: t('activeVisits', 'Active Visits'),
      value: todayPatientCount,
      onClick: () => {
        launchWorkSpace("Today's clients", <TodaysClientList />, {
          numberOfClients: todayPatientCount,
          subTitle: t('todaysClients', "Today's clients"),
          dateLastUpdated: '--',
        });
      },
    },
    {
      title: t('lastPositive', 'Positive in last 14 days'),
      linkAddress: '#',
      subTitle: t('clients', 'Clients'),
      value: positiveInLast14Days,
      onClick: () => {
        launchWorkSpace('Positive in last 14 days', <PositiveInLast14Days />, {
          numberOfClients: positiveInLast14Days,
          subTitle: t('positiveInLast14Days', 'Clients who tested positive in the last 14 days'),
          dateLastUpdated: '--',
        });
      },
    },
    {
      title: t('linkedToCare', 'Linked to care in last 14 days'),
      linkAddress: '#',
      subTitle: t('last14Days', 'Last 14 days'),
      value: linkedToCareInLast14Days,
      onClick: () => {
        launchWorkSpace('Linked to care in last 14 days', <LinkedToCareInLast14Days />, {
          numberOfClients: linkedToCareInLast14Days,
          subTitle: t('clientsLinkedToCare', 'Clients linked to care in the last 14 days'),
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
    return fetchTodayClients().then((response) => {
      setTodayPatientCount(response.length);
    });
  }

  function getPositiveInLast14days() {
    return fetchPatientsFromObservationCodeConcept(
      obsConcepts.hivTestResultConceptUUID,
      obsConcepts.finalPositiveHIVValueConcept,
      14,
    ).then((response) => {
      setPositiveInLast14Days(response.length);
    });
  }

  function getLinkedToCareInLast14days() {
    return fetchPatientsFromObservationCodeConcept(
      obsConcepts.linkedToCareCodeConcept,
      obsConcepts.linkedToCareYesValueConcept,
      14,
    ).then((response) => {
      setLinkedToCareInLast14Days(response.length);
    });
  }

  return (
    <>
      <Row className={styles.desktopView}>
        {tiles.map((tile, index) => {
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
        <OHRISummaryTileTablet details={tiles} />
      </Row>
    </>
  );
}

export default HTSSummaryTiles;
