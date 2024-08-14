import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles, fetchMambaReportData } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';

function MaternalChildSummaryTiles() {
  const { t } = useTranslation();
  const config = useConfig();
  const { showTotalPregnantWomen, showTotalDeliveries, showHivExposedInfants } = config;

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

  const tiles = useMemo(() => {
    const allTiles = [];

    if (showTotalPregnantWomen) {
      allTiles.push({
        title: t('anc', 'ANC'),
        linkAddress: '#',
        subTitle: t('pregnantWomenAttendingFirstANC', '# Pregnant women attending first ANC'),
        value: totalPregnantWomen,
      });
    }

    if (showTotalDeliveries) {
      allTiles.push({
        title: t('labourDelivery', 'Labour & Delivery'),
        linkAddress: '#',
        subTitle: t('totalDeliveries', '# Total deliveries'),
        value: totalDeliveries,
      });
    }

    if (showHivExposedInfants) {
      allTiles.push({
        title: t('children', 'Children'),
        linkAddress: '#',
        subTitle: t('hivExposedChildrenEnrolledInFollowUpCare', '# HIV Exposed children enrolled in follow up care'),
        value: hivExposedInfants,
      });
    }

    return allTiles;
  }, [
    t,
    totalPregnantWomen,
    totalDeliveries,
    hivExposedInfants,
    showTotalPregnantWomen,
    showTotalDeliveries,
    showHivExposedInfants,
  ]);

  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default MaternalChildSummaryTiles;
