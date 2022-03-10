import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface ContactTracingListProps {
  patientUuid: string;
}

const ContactTracingList: React.FC<ContactTracingListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('contactTracing', 'Contact Tracing');
  const displayText = t('contactTracing', 'Contact Tracing');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default ContactTracingList;
