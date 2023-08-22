import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles, getReportingCohort } from '@ohri/openmrs-esm-ohri-commons-lib';
import { clientsEnrolledToCare } from '../../constants';
import { getTotalPregnantWomen } from '../../api/api';
import { getTotalDeliveries } from '../../api/api';
import { getHivExposedInfants } from '../../api/api';

function MaternalChildSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeClientsCount, setActiveClientsCount] = useState(0);
  const [totalPregnantWomen, setTotalPregnantWomen] = useState(0);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [hivExposedInfants, setHivExposedInfants] = useState(0);

   useEffect(() => {
       getTotalPregnantWomen().then(count => {
         setTotalPregnantWomen(count);
       });
     }, []);

   useEffect(() => {
       getTotalDeliveries().then(count => {
         setTotalDeliveries(count);
       });
     }, []);

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
      value: totalPregnantWomen,
    },
    {
      title: t('labourDelivery', 'Labour & Delivery'),
      linkAddress: '#',
      subTitle: t('totalDeliveries', '# Total deliveries'),
      value: totalDeliveries,
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
