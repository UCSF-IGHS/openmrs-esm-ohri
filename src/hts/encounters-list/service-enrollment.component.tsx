import React, { useEffect, useMemo, useState } from 'react';
import styles from './hts-overview-list.scss';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';
import { SessionMode } from '../../forms/types';

export const htsFormSlot = 'hts-encounter-form-slot';
export const htsEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

const ServiceEnrolmentList: React.FC<any> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<SessionMode>('enter');
  const [currentEncounterUuid, setCurrentEncounterUuid] = useState(null);

  const launchHTSForm = () => {
    setCurrentEncounterUuid(null);
    setCurrentMode('enter');
    setOpen(true);
  };

  const headerTitle = 'Service Enrollment';

  return (
    <>
      <EmptyState
        displayText={t('serviceEnrollment', 'service enrollment')}
        headerTitle={headerTitle}
        launchForm={launchHTSForm}
      />
    </>
  );
};

export default ServiceEnrolmentList;
