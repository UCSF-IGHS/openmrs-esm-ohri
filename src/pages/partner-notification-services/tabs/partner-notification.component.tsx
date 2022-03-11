import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../../components/empty-state/empty-state.component';

interface PartnerNotificationListProps {
  patientUuid: string;
}

const PartnerNotificationList: React.FC<PartnerNotificationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const headerTitle = t('partnerNotification', 'Partner Notification');
  const displayText = t('partnerNotification', 'Partner Notification');

  return (
    <>
      <EmptyState displayText={displayText} headerTitle={headerTitle} />
    </>
  );
};

export default PartnerNotificationList;
