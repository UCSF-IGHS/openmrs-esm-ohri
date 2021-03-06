import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from 'openmrs-esm-ohri-commons-lib';

interface AdherenceCounsellingListProps {
  patientUuid: string;
}

const AdherenceCounsellingList: React.FC<AdherenceCounsellingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('adherenceCounselling', 'Adherence Counselling');
  const displayText = t('adherenceCounselling', 'Adherence Counselling');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default AdherenceCounsellingList;
