import React from 'react';
import { Home, ListBulleted, Calendar, Medication, Events } from '@carbon/react/icons';

export const homeDashboardMeta = {
  name: 'home',
  slot: 'ohri-home-dashboard-slot',
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

export const pharmacyDashboardMeta = {
  name: 'pharmacy',
  slot: 'ohri-pharmacy-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Medication },
  isLink: true,
  title: 'Pharmacy',
};

export const outpatientDashboardMeta = {
  name: 'outpatient',
  slot: 'ohri-outpatient-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Events },
  isLink: true,
  title: 'Outpatient/Service Queues',
};
