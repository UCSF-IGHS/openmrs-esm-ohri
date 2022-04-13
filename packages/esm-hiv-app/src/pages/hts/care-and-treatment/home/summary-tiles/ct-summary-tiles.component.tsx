import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getReportingCohort } from '../../../../../api/api';
import OHRIProgrammeSummaryTiles from '../../../../../components/tile/ohri-programme-summary-tiles.component';
import { clientsEnrolledToCare } from '../../../../../constants';

function CTSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeClientsCount, setActiveClientsCount] = useState(0);

  useEffect(() => {
    getReportingCohort(clientsEnrolledToCare).then(data => {
      setActiveClientsCount(data.members.length);
    });
  }, []);
  const tiles = [
    {
      title: t('activeClients', 'Active Clients'),
      linkAddress: '#',
      subTitle: t('patientsInClinicPopulation', 'Patients in clinic population'),
      value: activeClientsCount,
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
