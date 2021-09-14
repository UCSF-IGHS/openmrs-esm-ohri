import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OHRIProgrammeSummaryTiles from '../../../../components/tile/ohri-programme-summary-tiles.component';

function CTSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();

  const tiles = [
    {
      title: t('activeClients', 'Active Clients'),
      linkAddress: '#',
      subTitle: t('patientsInClinicPopulation', 'Patients in clinic population'),
      value: 200,
    },
    {
      title: t('missedAppointments', 'Missed appointments'),
      linkAddress: '#',
      subTitle: '0-30 days',
      value: 50,
    },
    {
      title: t('suspectedLTFU', 'Suspected LTFU'),
      linkAddress: '#',
      subTitle: t('noDrugsPickedLast90days', 'No drugs picked, last 90 days'),
      value: 10,
    },
  ];
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default CTSummaryTiles;
