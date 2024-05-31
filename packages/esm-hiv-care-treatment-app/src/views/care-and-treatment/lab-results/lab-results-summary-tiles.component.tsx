import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OHRIProgrammeSummaryTiles, getReportingCohort } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useConfig } from '@openmrs/esm-framework';

function LabResultsSummaryTiles() {
  const { t } = useTranslation();
  const [missingCd4Count, setMissingCd4Count] = useState(0);
  const [dueForVlCount, setDueForVlCount] = useState(0);
  const [highVlCount, setHighVlCount] = useState(0);
  const { cohorts } = useConfig();

  useEffect(() => {
    getReportingCohort(cohorts.missingCd4Cohort).then((data) => {
      setMissingCd4Count(data.members.length);
    });

    getReportingCohort(cohorts.highVlCohort).then((results) => {
      setHighVlCount(results.members.length);
    });
  }, []);

  const tiles = [
    {
      title: t('missingCd4', 'Missing CD4'),
      linkAddress: '#',
      subTitle: t('noCd4Results', 'Patients with no CD4 result (count)'),
      value: missingCd4Count,
    },
    {
      title: t('vlDue', 'Due for VL'),
      linkAddress: '#',
      subTitle: t('noVlResults', 'Patients with no VL in the last 12 months (count)'),
      value: dueForVlCount,
    },
    {
      title: t('highVl', 'High VL'),
      linkAddress: '#',
      subTitle: t('highVlResults', 'Patients whose recent VL >1000 copies/ml (count)'),
      value: highVlCount,
    },
  ];

  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default LabResultsSummaryTiles;
