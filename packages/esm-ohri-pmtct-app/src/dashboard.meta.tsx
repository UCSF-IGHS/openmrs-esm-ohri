import React, { useState } from 'react';
import styles from './dashboard.scss';

export const mnchSummary_dashboardMeta = {
  slot: 'mnch-summary-slot',
  columns: 1,
  title: 'MNCH Summary',
};

export const maternalHealth_dashboardMeta = {
  slot: 'maternal-health-summary-slot',
  columns: 1,
  title: 'Maternal Health',
};

export const childHealth_dashboardMeta = {
  slot: 'child-health-summary-slot',
  columns: 1,
  title: 'Child Health',
};

export const medication_dashboardMeta = {
  slot: 'medication-summary-slot',
  columns: 1,
  title: 'Medication',
};

export const labs_dashboardMeta = {
  slot: 'labs-summary-slot',
  columns: 1,
  title: 'Labs',
};

export const mchFolderMeta = {
  title: 'Maternal & Child Health',
  slotName: 'mch-slot',
  isExpanded: false,
};
