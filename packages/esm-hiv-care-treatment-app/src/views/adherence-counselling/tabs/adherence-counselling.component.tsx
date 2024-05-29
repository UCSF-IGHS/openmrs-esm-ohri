import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';

interface AdherenceCounsellingListProps {
  patientUuid: string;
}

const AdherenceCounsellingList: React.FC<AdherenceCounsellingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('adherenceCounselling', 'Adherence Counselling');

  return (
    <>
      <EmptyState displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default AdherenceCounsellingList;
