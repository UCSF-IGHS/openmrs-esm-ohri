import { EmptyStateComingSoon } from '@ohri/openmrs-esm-ohri-commons-lib';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
interface OverviewListProps {
  patientUuid: string;
}

const TBSummaryOverviewList: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerRecentTB = t('recentTuberculosis', 'Recent Tuberculosis');
  const headerPreviousCases = t('previousCases', 'Previous Cases');
  const headerVisit = t('visits', 'Visits');

  return (
    <>
      <EmptyStateComingSoon displayText={headerRecentTB} headerTitle={headerRecentTB} />
      <EmptyStateComingSoon displayText={headerPreviousCases} headerTitle={headerPreviousCases} />
      <EmptyStateComingSoon displayText={headerVisit} headerTitle={headerVisit} />
    </>
  );
};

export default TBSummaryOverviewList;
