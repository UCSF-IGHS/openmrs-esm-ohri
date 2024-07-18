import { ConfigurableLink } from '@openmrs/esm-framework';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ptrackerdashboardPath } from '../constants';

const PtrackerDashboardNavigation = () => {
  const { t } = useTranslation();

  return <ConfigurableLink to={ptrackerdashboardPath}>{t('ptrackerReports', 'PTracker Reports')}</ConfigurableLink>;
};

export default PtrackerDashboardNavigation;
