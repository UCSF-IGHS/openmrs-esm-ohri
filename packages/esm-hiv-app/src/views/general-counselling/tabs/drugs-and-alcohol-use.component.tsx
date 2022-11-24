import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@ohri/openmrs-esm-ohri-commons-lib';

interface DrugsAndAlcoholUseListProps {
  patientUuid: string;
}

const DrugsAndAlcoholUseList: React.FC<DrugsAndAlcoholUseListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('drugsAndAlcoholUse', 'Drugs and Alcohol Use');

  return (
    <>
      <EmptyState displayText={headerTitle} headerTitle={headerTitle} />
    </>
  );
};

export default DrugsAndAlcoholUseList;
