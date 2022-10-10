import React from 'react';
import { SideNavMenuItem, SideNavMenu } from '@carbon/react';
import styles from './sidenav-links.scss';

const isActiveLink = (urlFragment) => window.location.pathname.indexOf(urlFragment) !== -1;

export const createDashboardLink = (db) => {
  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    return (
      <SideNavMenu title="HIV" className={styles.noMarker} defaultExpanded={true}>
        <SideNavMenuItem
          className={isActiveLink(db.hts.name) ? styles.currentNavItem : ''}
          href={`${basePath}/${db.hts.name}`}>
          {db.hts.title}
        </SideNavMenuItem>
        <SideNavMenuItem
          className={isActiveLink(db.caretreament.name) ? styles.currentNavItem : ''}
          href={`${basePath}/${db.caretreament.name}`}>
          {db.caretreament.title}
        </SideNavMenuItem>
        <SideNavMenuItem>{db.pmtct.title}</SideNavMenuItem>
      </SideNavMenu>
    );
  };

  return DashboardLink;
};
