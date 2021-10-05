import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getReportingCohort } from '../../../api/api';
import OHRIProgrammeSummaryTiles from '../../../components/tile/ohri-programme-summary-tiles.component';
import { covidVaccinatedClients } from '../../../constants';

function CTSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeClientsCount, setActiveClientsCount] = useState(100);
  const [covidVaccinatedClientsCount, setCovidVaccinatedClients] = useState(0);

  useEffect(() => {
    getReportingCohort(covidVaccinatedClients).then(data => {
      setCovidVaccinatedClients(data.members.length);
    });
  }, []);
  const tiles = [
    {
      title: t('assessments', 'Assessments'),
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
      value: covidVaccinatedClientsCount,
    },
  ];
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default CTSummaryTiles;
