import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getReportingCohort } from '../../../api/api';
import OHRIProgrammeSummaryTiles from '../../../components/tile/ohri-programme-summary-tiles.component';
import { clientsEnrolledToCare } from '../../../constants';

function CTSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeClientsCount, setActiveClientsCount] = useState(100);

  useEffect(() => {
    // TODO: cohort needs to be created.
    // getReportingCohort(clientsEnrolledToCare).then(data => {
    //   setActiveClientsCount(data.members.length);
    // });
  }, []);
  const tiles = [
    {
      title: t('testing', 'Assessment'),
      linkAddress: '#',
      subTitle: t('testsConducted', 'Completed assessments'),
      value: activeClientsCount,
    },
    {
      title: t('cases', 'Cases'),
      linkAddress: '#',
      subTitle: t('peopleTestedPositive', 'People tested positive'),
      value: 50,
    },
    {
      title: t('vaccinations', 'Vaccinations'),
      linkAddress: '#',
      subTitle: t('peopleVaccinated', 'People vaccinated'),
      value: 10,
    },
  ];
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default CTSummaryTiles;
