import React from 'react';
import { Home } from '@carbon/react/icons';

export const homeDashboardMeta = {
  name: 'home',
  slot: 'ohri-home-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: <Home size={32} /> },
  isLink: true,
  title: 'Home',
};
