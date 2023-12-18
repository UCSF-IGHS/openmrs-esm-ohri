import { OHRIProgrammeSummaryTiles } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchMambaReportData } from '../../../../../../packages/esm-commons-lib/src/api/api';

function TbSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeDSClientsCount, setActiveDSClientsCount] = useState(null);
  const [activeDRClientsCount, setActiveDRClientsCount] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dsCount = await fetchMambaReportData('total_active_ds_cases');
        const drCount = await fetchMambaReportData('total_active_dr_cases');

        setActiveDSClientsCount(dsCount);
        setActiveDRClientsCount(drCount);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, []);
  
  const tiles = useMemo(
    () => [
      {
        title: t('activeDsCases', 'Active DS Cases'),
        linkAddress: '#',
        subTitle: t('drugSensitive', 'Cases with drug sesnsitive TB'),
        value: activeDSClientsCount,
      },
      {
        title: t('activeDrCases', 'Active DR Cases'),
        linkAddress: '#',
        subTitle: t('drugResistant', 'Cases with drug resistant TB'),
        value: activeDRClientsCount,
      }
    ],
    [activeDSClientsCount, activeDRClientsCount],
  );

  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default TbSummaryTiles;