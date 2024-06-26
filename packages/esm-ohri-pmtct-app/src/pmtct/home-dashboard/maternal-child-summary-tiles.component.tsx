import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles, fetchMambaReportData } from '@ohri/openmrs-esm-ohri-commons-lib';

function MaternalChildSummaryTiles() {
  const { t } = useTranslation();

  const [totalPregnantWomen, setTotalPregnantWomen] = useState(null);
  const [totalDeliveries, setTotalDeliveries] = useState(null);
  const [hivExposedInfants, setHivExposedInfants] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalPregnantWomenCount, totalDeliveriesCount, hivExposedInfantsCount] = await Promise.all([
          fetchMambaReportData('total_pregnant_women'),
          fetchMambaReportData('total_deliveries'),
          fetchMambaReportData('total_hiv_exposed_infants'),
        ]);

        setTotalPregnantWomen(totalPregnantWomenCount);
        setTotalDeliveries(totalDeliveriesCount);
        setHivExposedInfants(hivExposedInfantsCount);
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
    ],
    [t, totalPregnantWomen, totalDeliveries, hivExposedInfants],
  );
  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default MaternalChildSummaryTiles;
