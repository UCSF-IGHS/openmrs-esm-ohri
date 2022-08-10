import React, { useState } from 'react';
import styles from './dashboard.scss';

export const CaCxSummary_dashboardMeta = {
  slot: 'cacx-summary-slot',
  columns: 1,
  title: 'CaCx Summary',
};

export const CaCxVisits_dashboardMeta = {
  slot: 'cacx-visits-slot',
  columns: 1,
  title: 'CaCx Visits',
};

export const CaCxAppointments_dashboardMeta = {
  slot: 'cacx-appointments-slot',
  columns: 1,
  title: 'CaCx Appointments',
};

export const cervicalCancerFolderMeta = {
  title: 'Cervical Cancer',
  slotName: 'cervical-cancer-slot',
  isExpanded: false,
};
