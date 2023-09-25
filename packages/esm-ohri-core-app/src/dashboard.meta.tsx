import React from 'react';
import { Home, ListBulleted, Calendar, Medication, Events } from '@carbon/react/icons';

export const homeDashboardMeta = {
  name: 'Home',
  slot: 'home-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Home },
  isLink: true,
  title: 'Home',
};

export const patientListMeta = {
  name: 'patient-lists',
  slot: 'ohri-patient-list-slot',
  config: { columns: 1, type: 'grid', icon: ListBulleted },
  isLink: true,
  title: 'Patient Lists',
};

export const appointmentsDashboardMeta = {
  name: 'appointments',
  slot: 'ohri-appointments-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Calendar },
  isLink: true,
  title: 'Appointments',
};

export const dispensingDashboardMeta = {
  name: 'dispensing',
  slot: 'ohri-dispensing-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Medication },
  isLink: true,
  title: 'Dispensing',
};

export const serviceQueuesDashboardMeta = {
  name: 'service-queues',
  slot: 'ohri-service-queues-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Events },
  isLink: true,
  title: 'Service Queues',
};

export const patientChartDivider_dashboardMeta = {
  name: 'clinical-views-divider',
  slot: 'patient-chart-sidenav-divider-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Clinical Views',
};
