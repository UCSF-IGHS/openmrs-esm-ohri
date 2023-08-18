import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles, getReportingCohort } from '@ohri/openmrs-esm-ohri-commons-lib';
import { clientsEnrolledToCare } from '../../constants';
import { getHivExposedInfants } from '../../api/api';

function MaternalChildSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeClientsCount, setActiveClientsCount] = useState(0);
  const [hivExposedInfants, setHivExposedInfants] = useState(0);

  // useEffect(() => {
  //   getReportingCohort(clientsEnrolledToCare).then((data) => {
  //     setActiveClientsCount(data.members.length);
  //   });
  // }, []);
   useEffect(() => {
     getHivExposedInfants().then(count => {
       setHivExposedInfants(count);
     });
   }, []);

  const tiles = [
    {
      title: t('anc', 'ANC'),
      linkAddress: '#',
      subTitle: t('pregnantWomenAttendingFirstANC', '# Pregnant women attending first ANC'),
      value: 'N/A',
    },
    {
      title: t('labourDelivery', 'Labour & Delivery'),
      linkAddress: '#',
      subTitle: t('totalDeliveries', '# Total deliveries'),
      value: 'N/A',
    },
    {
      title: t('children', 'Children'),
      linkAddress: '#',
      subTitle: t('hivExposedChildrenEnrolledInFollowUpCare', '# HIV Exposed children enrolled in follow up care'),
      value: hivExposedInfants,
    },
  ];
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default MaternalChildSummaryTiles;
