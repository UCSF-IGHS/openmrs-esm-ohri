import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles, getReportingCohort } from '@ohri/openmrs-esm-ohri-commons-lib';
import { clientsEnrolledToCare } from '../../constants';

function CTSummaryTiles({ launchWorkSpace }) {
  const { t } = useTranslation();
  const [activeClientsCount, setActiveClientsCount] = useState(0);

  useEffect(() => {
    getReportingCohort(clientsEnrolledToCare).then((data) => {
      setActiveClientsCount(data.members.length);
    });
  }, []);
  const tiles = [
    {
      title: t('anc', 'ANC'),
      linkAddress: '#',
      subTitle: t('pregnantWomenAttendingFirstANC', 'Pregnant women attending first ANC'),
      value: activeClientsCount,
    },
    {
      title: t('labourDelivery', 'Labour & Delivery'),
      linkAddress: '#',
      subTitle: t('totalDeliveries', 'Total deliveries'),
      value: '--',
    },
    {
      title: t('children', 'Children'),
      linkAddress: '#',
      subTitle: t('HIVExposedChildrenEnrolledInFollowUpCare', 'HIV Exposed children enrolled in follow up care'),
      value: 10,
    },
  ];
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default CTSummaryTiles;
