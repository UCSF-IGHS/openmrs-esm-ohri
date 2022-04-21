import React, { useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from '../dashboard.scss';
import Events from '../../../esm-ohri-core-app/src/utils/events';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(hts_dashboardMeta.name) !== -1 || pathname.indexOf(preExposureProphylaxis_dashboardMeta.name) !== -1;

// TODO This needs to be refactored to automatically get the length/size
const menuItems = 2;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('hiv-prevention-sidenavItems'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];
  buffer.push(sidenavItem);

  localStorage.setItem('hiv-prevention-sidenavItems', JSON.stringify(buffer));

  return buffer;
};

export const clearHivPreventionSidenavRegistry = () => localStorage.removeItem('hiv-prevention-sidenavItems');

export const createHIVPreventionDashboardLink = db => {
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
      <SideNavMenu title="HIV Prevention" className={styling} defaultExpanded={shouldSidemenuBeExpanded()}>
        {navItems.map(navItem => (
          <SideNavMenuItem
            key={navItem.title}
            className={isActiveLink(navItem.name) ? styles.currentNavItem : ''}
            href={`${basePath}/${navItem.name}`}
            onClick={e => {
              handleLinkClick(e, `${basePath}/${navItem.name} `);
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
