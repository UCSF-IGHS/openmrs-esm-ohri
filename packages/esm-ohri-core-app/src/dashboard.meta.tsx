import React, { useEffect, useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';
import Events from './utils/events';
import { Home32 } from '@carbon/icons-react';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(encodeURIComponent(serviceEnrolment_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(hts_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(serviceSummary_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(clinicalVisit_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(labResults_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(drugOrders_dashboardMeta.title)) !== -1;

const menuItems = 6;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('sidenavItems'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];
  buffer.push(sidenavItem);

  localStorage.setItem('sidenavItems', JSON.stringify(buffer));

  return buffer;
};

export const clearSidenavRegistry = () => localStorage.removeItem('sidenavItems');

export const createDashboardLink = db => {
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
      <SideNavMenu title="HIV" className={styling} defaultExpanded={shouldSidemenuBeExpanded()}>
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
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HTS ',
};

export const serviceEnrolment_dashboardMeta = {
  slot: 'hts-service-enrolment-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Service Enrolment',
};

export const serviceSummary_dashboardMeta = {
  slot: 'hts-service-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Service Summary',
};

export const clinicalVisit_dashboardMeta = {
  slot: 'hts-clinical-visit-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Clinical Visit',
};

export const labResults_dashboardMeta = {
  slot: 'hts-lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Lab Results',
};

export const drugOrders_dashboardMeta = {
  slot: 'hts-drug-orders-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Drug Orders',
};

export const homeDashboardMeta = {
  name: 'home',
  slot: 'ohri-home-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Home32 },
  isLink: true,
  title: 'Home',
};
