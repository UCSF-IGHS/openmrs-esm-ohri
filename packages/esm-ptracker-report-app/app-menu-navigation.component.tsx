import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

export default function PtrackerReportAppMenuLink() {
  const { t } = useTranslation();
  return (
    <ConfigurableLink to={'/openmrs/reportingui/reportsapp/home.page'}>
      {t('ptrackerReports', 'Ptracker Reports')}
    </ConfigurableLink>
  );
}
