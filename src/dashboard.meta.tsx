import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { SideNav, SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import styles from './dasboard.scss';

export const createDashboardLink = db => {
  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    return (
      <SideNavMenu title="HIV" className={styles.noMarker}>
        <SideNavMenuItem href={`${basePath}/${db.name}`}> HTS </SideNavMenuItem>
        <SideNavMenuItem> Care and Treatment </SideNavMenuItem>
        <SideNavMenuItem> PMTCT </SideNavMenuItem>
      </SideNavMenu>
    );
  };
  return DashboardLink;
};

export const dashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HTS Sessions',
};
