import { OHRIProgrammeSummaryTiles } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getActiveDsCasesCount, getActiveDrCasesCount, } from '../../../api/api';

function TbSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeDSClientsCount, setActiveDSClientsCount] = useState(null);
  const [activeDRClientsCount, setActiveDRClientsCount] = useState(null);

  useEffect(() => {
    getActiveDsCasesCount().then((count) => {
      setActiveDSClientsCount(count);
    });
  }, []);

  useEffect(() => {
    getActiveDrCasesCount().then((count) => {
      setActiveDRClientsCount(count);
    });
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