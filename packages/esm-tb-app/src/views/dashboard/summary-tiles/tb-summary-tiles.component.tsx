import { OHRIProgrammeSummaryTiles } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

function TbSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeDSClientsCount, setActiveDSClientsCount] = useState(35);
  const [activeDRClientsCount, setActiveDRClientsCount] = useState(5);
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
    [],
  );
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default TbSummaryTiles;