import React from 'react';
import { Home, ListBulleted, Calendar, Medication } from '@carbon/react/icons';

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
  name: 'pharamacy',
  slot: 'ohri-pharmacy-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Medication },
  isLink: true,
  title: 'Pharmacy',
};
