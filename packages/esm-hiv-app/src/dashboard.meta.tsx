import { Home32, Calendar32 } from '@carbon/icons-react';
import React, { useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';
import Events from '../../esm-ohri-core-app/src/utils/events';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(encodeURIComponent(hts_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(preExposureProphylaxis_dashboardMeta.title)) !== -1;

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

export const hivFolderDashboardMeta = {
  slot: 'ohri-hiv-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Home32 },
  isFolder: true,
  title: 'HIV',
};

export const htsDashboardMeta = {
  name: 'hts',
  slot: 'hts-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'hts', dashboardTitle: 'HTS Home Page' },
  title: 'HTS',
};

export const careAndTreatmentDashboardMeta = {
  name: 'care-and-treatment',
  slot: 'care-and-treatment-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'ct', dashboardTitle: 'C&T Home Page' },
  title: 'Care and Treatment',
};
export const labResultsDashboardMeta = {
  name: 'lab-results',
  slot: 'lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'lab', dashboardTitle: 'Lab Results Home Page' },
  title: 'Lab Results',
};
