import React, { useCallback, useEffect, useState } from 'react';
import { SideNavMenuItem } from '@carbon/react';
import { ExtensionSlot, navigate } from '@openmrs/esm-framework';
import styles from './ohri-patient-chart-sidenav.scss';

export const createOHRIPatientChartSideNavLink = (meta) => {
  const NavItem: React.FC<{}> = (props) => {
    return <SideNavMenuItem className={styles.ohriPatientChartSideNavItem}>{meta.title}</SideNavMenuItem>;
  };
  return NavItem;
};
