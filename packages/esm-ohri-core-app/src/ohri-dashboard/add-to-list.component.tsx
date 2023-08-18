import React, { useCallback } from 'react';
import { OverflowMenuItem } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { AddPatientToListOverflowMenuItem } from '@ohri/openmrs-esm-ohri-commons-lib';

const AddToListOverflowMenuItem = ({ patientUuid }) => {
  const { t } = useTranslation();

  // Corrected handleClick function
  const handleClick = useCallback(() => {
    // Render the component here
    return <AddPatientToListOverflowMenuItem patientUuid={patientUuid} />;
  }, [patientUuid]);

  return (
    <OverflowMenuItem
      itemText={t('addToList')}
      onClick={handleClick}
      style={{
        maxWidth: '100vw',
      }}
    />
  );
};

export default AddToListOverflowMenuItem;
