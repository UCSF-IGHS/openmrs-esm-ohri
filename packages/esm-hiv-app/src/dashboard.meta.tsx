import React, { useState } from 'react';
import { Home32, Calendar32 } from '@carbon/icons-react';

// Patient Chart Dashboards
export const hivPreventionDashboardDMeta = {
  title: 'HIV Prevention',
  slotName: 'ohri-hiv-prevention-slot',
};

export const hts_dashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HIV Testing Services (HTS)',
};

export const preExposureProphylaxis_dashboardMeta = {
  name: 'pre-exposure-prophylaxis',
  slot: 'pre-exposure-prophylaxis-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Pre-exposure Prophylaxis',
};

export const hivCareAndTreatmentDashboardDMeta = {
  title: 'HIV Care and Treatment',
  slotName: 'ohri-hiv-care-and-treatment-slot',
};

export const serviceSummary_dashboardMeta = {
  slot: 'hts-service-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Service Summary',
};

export const labResults_dashboardMeta = {
  slot: 'hts-lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Labs',
};

export const programManagement_dashboardMeta = {
  slot: 'program-management-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Program Management',
};

export const visits_dashboardMeta = {
  slot: 'visits-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Clinical Visits',
};

export const generalCounselling_dashboardMeta = {
  slot: 'general-counselling-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'General Counselling',
};

export const adherenceCounselling_dashboardMeta = {
  slot: 'adherence-counselling-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Adherence Counselling',
};

export const partnerNotificationServices_dashboardMeta = {
  slot: 'partner-notification-services-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Partner Notification Services',
};

export const medications_dashboardMeta = {
  slot: 'medications-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Medications',
};

export const appointments_dashboardMeta = {
  slot: 'appointments-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Appointments Summary',
};

// Clinical Dashboards
export const hivFolderDashboardMeta = {
  slot: 'ohri-hiv-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Home32 },
  isFolder: true,
  title: 'HIV',
};

export const htsDashboardMeta = {
  name: 'hts',
  slot: 'hts-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'hts', dashboardTitle: 'HTS Home Page' },
  title: 'HTS',
};

export const careAndTreatmentDashboardMeta = {
  name: 'care-and-treatment',
  slot: 'care-and-treatment-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'ct', dashboardTitle: 'C&T Home Page' },
  title: 'Care and Treatment',
};
export const labResultsDashboardMeta = {
  name: 'lab-results',
  slot: 'lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Lab Results',
};
