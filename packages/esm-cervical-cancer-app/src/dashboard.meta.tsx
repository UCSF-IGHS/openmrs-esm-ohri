import { Home32, Calendar32 } from '@carbon/icons-react';
import React, { useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';
import Events from '../../esm-ohri-core-app/src/utils/events';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(encodeURIComponent(CaCxSummary_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(CaCxVisits_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(CaCxAppointments_dashboardMeta.title)) !== -1;

// TODO This needs to be refactored to automatically get the length/size
const menuItems = 3;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('cervical-cancer-sidenavItems'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];
  buffer.push(sidenavItem);

  localStorage.setItem('cervical-cancer-sidenavItems', JSON.stringify(buffer));

  return buffer;
};

export const clearCervicalCancerSidenavRegistry = () => localStorage.removeItem('cervical-cancer-sidenavItems');

export const createCervicalCancerDashboardLink = db => {
  const navItems = registerSidenavItem(db);
  const styling = navItems.length === menuItems ? styles.noMarker : styles.hide;

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }, props) => {
    const [rerender, setRerender] = useState(true);
    const forceRerender = () => setRerender(!rerender);

    Events.subscribe('navigation-from-covid', e => {
      e.preventDefault();
      forceRerender();
    });

    return (
      <SideNavMenu title="Cervical Cancer" className={styling} defaultExpanded={shouldSidemenuBeExpanded()}>
        {navItems.map(navItem => (
          <SideNavMenuItem
            key={navItem.title}
            className={isActiveLink(encodeURIComponent(navItem.title)) ? styles.currentNavItem : ''}
            href={`${basePath}/${encodeURIComponent(navItem.title)}`}
            onClick={e => {
              handleLinkClick(e, `${basePath}/${encodeURIComponent(navItem.title)} `);
              forceRerender();
              Events.dispatch('navigation-from-hiv');
            }}>
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

export const CaCxSummary_dashboardMeta = {
  slot: 'cacx-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'CaCx Summary',
};

export const CaCxVisits_dashboardMeta = {
  slot: 'cacx-visits-slot',
  config: { columns: 1, type: 'grid' },
  title: 'CaCx Visits',
};

export const CaCxAppointments_dashboardMeta = {
  slot: 'cacx-appointments-slot',
  config: { columns: 1, type: 'grid' },
  title: 'CaCx Appointments',
};
