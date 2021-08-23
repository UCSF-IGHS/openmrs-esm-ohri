import React from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('sidenavItems'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];

  //avoid duplicates by limiting list size to 2 elements
  if (buffer.length <= 2) {
    buffer.push(sidenavItem);
  }

  localStorage.setItem('sidenavItems', JSON.stringify(buffer));

  return buffer;
};

export const clearSidenavRegistry = () => localStorage.removeItem('sidenavItems');

export const createDashboardLink = db => {
  const navItems = registerSidenavItem(db);
  const styling = navItems.length !== 2 ? styles.hide : styles.noMarker;

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    return (
      <SideNavMenu title="HIV" className={styling} defaultExpanded={true}>
        {navItems.map(navItem => (
          <SideNavMenuItem
            key={navItem.title}
            className={isActiveLink(navItem.name) ? styles.currentNavItem : ''}
            href={`${basePath}/${navItem.name}`}
            onClick={e => handleLinkClick(e, `${basePath}/${navItem.name} `)}>
            {navItem.title}
          </SideNavMenuItem>
        ))}
      </SideNavMenu>
    );
  };
  return DashboardLink;
};

export function handleLinkClick(event: any, to: string) {
  event.preventDefault();
  navigate({ to });
}
export const hts_dashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HTS ',
};

export const caretreament_dashboardMeta = {
  name: 'care-and-treatment',
  slot: 'care-and-treatment-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Care and Treatment',
};

export const pmtct = {
  name: 'PMTCT',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'PMTCT',
};
