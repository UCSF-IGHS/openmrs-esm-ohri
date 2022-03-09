import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface ArtTherapyTabListProps {
  patientUuid: string;
}

const ArtTherapyTabList: React.FC<ArtTherapyTabListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('artTherapy', 'ART Therapy');
  const displayText = t('artTherapy', 'ART Therapy');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default ArtTherapyTabList;
