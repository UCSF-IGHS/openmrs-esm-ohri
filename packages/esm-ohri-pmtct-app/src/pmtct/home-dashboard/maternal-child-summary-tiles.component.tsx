import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles, useMambaReportData } from '@ohri/openmrs-esm-ohri-commons-lib';

function MaternalChildSummaryTiles() {
  const { t } = useTranslation();

  const { data: pregnant_women, isLoading: loadingPregnancies } = useMambaReportData('total_pregnant_women');
  const { data: deliveries, isLoading: loadingDeliveries } = useMambaReportData('total_deliveries');
  const { data: hiv_exposed_infants, isLoading: loadingInfants } = useMambaReportData('total_hiv_exposed_infants');

  const tiles = useMemo(
    () => [
      {
        title: t('anc', 'ANC'),
        linkAddress: '#',
        subTitle: t('pregnantWomenAttendingFirstANC', '# Pregnant women attending first ANC'),
        value: loadingPregnancies ? '--' : pregnant_women,
      },
      {
        title: t('labourDelivery', 'Labour & Delivery'),
        linkAddress: '#',
        subTitle: t('totalDeliveries', '# Total deliveries'),
        value: loadingDeliveries ? '--' : deliveries,
      },
      {
        title: t('children', 'Children'),
        linkAddress: '#',
        subTitle: t('hivExposedChildrenEnrolledInFollowUpCare', '# HIV Exposed children enrolled in follow up care'),
        value: loadingInfants ? '--' : hiv_exposed_infants,
      },
    ],
    [t, loadingPregnancies, pregnant_women, loadingDeliveries, deliveries, loadingInfants, hiv_exposed_infants],
  );
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default MaternalChildSummaryTiles;
