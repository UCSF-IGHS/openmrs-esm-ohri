import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { SideNav, SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import styles from './dashboard.scss';

export const createDashboardLink = db => {
  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    return (
      <SideNavMenuItem className={styles.noMarker} href={`${basePath}/${db.name}`}>
        {db.title}
      </SideNavMenuItem>
    );
  };
  return DashboardLink;
};

export const hts_dashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HTS ',
};

export const caretreament_dashboardMeta = {
  name: 'care-and-treatment',
  slot: 'care-treatment-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Care and Treatment',
};

export const pmtct = {
  name: 'PMTCT',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'PMTCT',
};
