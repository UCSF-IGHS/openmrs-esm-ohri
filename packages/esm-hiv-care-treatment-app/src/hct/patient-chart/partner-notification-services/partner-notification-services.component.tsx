import React from 'react';
import { useConfig } from '@openmrs/esm-framework';
import { EncounterListTabsComponent } from '@ohri/openmrs-esm-ohri-commons-lib';
import partnerNotificationsConfigSchema from './patner-notification-config.json';

interface OverviewListProps {
  patientUuid: string;
}

const PartnerNotificationServices: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const config = useConfig();

  const tabFilter = (encounter, formName) => {
    return encounter?.form?.name === formName;
  };

  return (
    <EncounterListTabsComponent
      patientUuid={patientUuid}
      configSchema={partnerNotificationsConfigSchema}
      config={config}
      filter={tabFilter}
    />
  );
};

export default PartnerNotificationServices;
