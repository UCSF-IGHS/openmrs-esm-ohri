import React from 'react';
import { SideNavMenuItem } from '@carbon/react';

import styles from './ohri-patient-chart-sidenav.scss';

export const createOHRIPatientChartSideNavLink = (meta) => {
  const NavItem: React.FC<{}> = (props) => {
    return <SideNavMenuItem className={styles.ohriPatientChartSideNavItem}>{meta.title}</SideNavMenuItem>;
  };
  return NavItem;
};

export const patientChartDivider_dashboardMeta = {
  name: 'clinical-views-divider',
  slot: 'patient-chart-sidenav-divider-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Clinical Views',
};
