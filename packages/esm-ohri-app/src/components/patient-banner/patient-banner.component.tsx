import { ExtensionSlot } from '@openmrs/esm-framework';
import React from 'react';
import styles from './patient-banner.scss';

export const PatientBanner: React.FC<{ patient: any }> = ({ patient }) => {
  return (
    <div className={styles.patientBannerContainer}>
      <ExtensionSlot
        extensionSlotName="patient-header-slot"
        state={{
          patient,
          patientUuid: patient.id,
        }}
      />
    </div>
  );
};
