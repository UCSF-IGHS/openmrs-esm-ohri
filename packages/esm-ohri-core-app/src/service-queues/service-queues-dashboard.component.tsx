import React, { useEffect } from 'react';
import { attach, detach, ExtensionSlot } from '@openmrs/esm-framework';

const ServiceQueuesDashboard = () => {
  useEffect(() => {
    attach('ohri-dashboard-service-queues-slot', 'service-queues-dashboard');
    return () => detach('ohri-dashboard-service-queues-slot', 'service-queues-dashboard');
  }, []);

  return <ExtensionSlot name="ohri-dashboard-service-queues-slot" state={{}} />;
};

export default ServiceQueuesDashboard;
