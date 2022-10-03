import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';

interface DrugsAndAlcoholUseListProps {
  patientUuid: string;
}

const DrugsAndAlcoholUseList: React.FC<DrugsAndAlcoholUseListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('drugsAndAlcoholUseTitle', 'Drugs and Alcohol Use');
  const displayText = t('drugsAndAlcoholUseDisplay', 'Drugs and Alcohol Use');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default DrugsAndAlcoholUseList;
