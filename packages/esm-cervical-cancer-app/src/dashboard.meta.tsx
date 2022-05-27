import React, { useState } from 'react';
import styles from './dashboard.scss';

export const CaCxSummary_dashboardMeta = {
  slot: 'cacx-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'CaCx Summary',
};

export const CaCxVisits_dashboardMeta = {
  slot: 'cacx-visits-slot',
  config: { columns: 1, type: 'grid' },
  title: 'CaCx Visits',
};

export const CaCxAppointments_dashboardMeta = {
  slot: 'cacx-appointments-slot',
  config: { columns: 1, type: 'grid' },
  title: 'CaCx Appointments',
};

export const cervicalCancerFolderMeta = {
  title: 'Cervical Cancer',
  slotName: 'cervical-cancer-slot',
};
