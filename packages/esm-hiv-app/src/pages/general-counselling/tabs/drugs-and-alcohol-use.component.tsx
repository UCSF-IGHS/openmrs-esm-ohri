import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface DrugsAndAlcoholUseListProps {
  patientUuid: string;
}

const DrugsAndAlcoholUseList: React.FC<DrugsAndAlcoholUseListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('drugsAndAlcoholUse', 'Drugs and Alcohol Use');
  const displayText = t('drugsAndAlcoholUse', 'Drugs and Alcohol Use');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default DrugsAndAlcoholUseList;
