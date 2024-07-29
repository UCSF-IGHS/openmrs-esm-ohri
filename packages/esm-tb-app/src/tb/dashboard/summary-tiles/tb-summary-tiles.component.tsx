import React, { useMemo } from 'react';
import { OHRIProgrammeSummaryTiles, useMambaReportData } from '@ohri/openmrs-esm-ohri-commons-lib';
import { useTranslation } from 'react-i18next';

interface ReportData {
  total_active_ds_cases: number;
  total_active_dr_cases: number;
}

function TbSummaryTiles() {
  const { t } = useTranslation();

  const { data: active_ds_cases, isLoading: loadingDsCases } = useMambaReportData('total_active_ds_cases');
  const { data: active_dr_cases, isLoading: loadingDrCases } = useMambaReportData('total_active_dr_cases');

  const tiles = useMemo(
    () => [
      {
        title: t('activeDsCases', 'Active DS Cases'),
        linkAddress: '#',
        subTitle: t('drugSensitive', 'Cases with drug sesnsitive TB'),
        value: loadingDsCases ? '--' : active_ds_cases,
      },
      {
        title: t('activeDrCases', 'Active DR Cases'),
        linkAddress: '#',
        subTitle: t('drugResistant', 'Cases with drug resistant TB'),
        value: loadingDrCases ? '--' : active_dr_cases,
      },
    ],
    [t, active_dr_cases, active_ds_cases, loadingDsCases, loadingDrCases],
  );

  return <OHRIProgrammeSummaryTiles tiles={tiles} />;
}

export default TbSummaryTiles;
