import { ExtensionSlot } from '@openmrs/esm-framework';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

function HtsSummaryPage() {
  const { t } = useTranslation();
  return <div>{t('htsSummaryPage', 'This is the hts summary page')}</div>;
}

export default HtsSummaryPage;
