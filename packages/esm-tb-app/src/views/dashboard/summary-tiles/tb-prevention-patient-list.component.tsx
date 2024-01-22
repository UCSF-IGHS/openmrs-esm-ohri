import { OHRIProgrammeSummaryTiles } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

function TbPreventionSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeDSClientsCount] = useState(78);
  const tiles = useMemo(
    () => [
      {
        title: t('allTptClients', 'All TPT Clients'),
        linkAddress: '#',
        subTitle: t('currentTptClients', 'Clients Currently on TPT'),
        value: activeDSClientsCount,
      },
    ],
    [],
  );
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default TbPreventionSummaryTiles;
