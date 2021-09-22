import React, { useEffect, useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(serviceEnrolment_dashboardMeta.name) !== -1 ||
  pathname.indexOf(hts_dashboardMeta.name) !== -1 ||
  pathname.indexOf(serviceSummary_dashboardMeta.name) !== -1 ||
  pathname.indexOf(clinicalVisit_dashboardMeta.name) !== -1 ||
  pathname.indexOf(labResults_dashboardMeta.name) !== -1 ||
  pathname.indexOf(drugOrders_dashboardMeta.name) !== -1;

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
console.info('localStorage: ', localStorage);

export const createDashboardLink = db => {
  const navItems = registerSidenavItem(db);
  const styling = navItems.length === menuItems ? styles.noMarker : styles.hide;

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }, props) => {
    const [rerender, setRerender] = useState(true);
    const forceRerender = () => setRerender(!rerender);

    document.addEventListener('navigation-from-covid', e => {
      e.preventDefault();
      forceRerender();
    });

    return (
      <SideNavMenu title="HIV" className={styling} defaultExpanded={shouldSidemenuBeExpanded()}>
        {navItems.map(navItem => (
          <SideNavMenuItem
            key={navItem.title}
            className={isActiveLink(navItem.name) ? styles.currentNavItem : ''}
            href={`${basePath}/${navItem.name}`}
            onClick={e => {
              handleLinkClick(e, `${basePath}/${navItem.name} `);
              forceRerender();
              document.dispatchEvent(new CustomEvent('navigation-from-hiv'));
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
  title: 'HTS ',
};

export const serviceEnrolment_dashboardMeta = {
  name: 'hts-service-enrolment',
  slot: 'hts-service-enrolment-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Service Enrolment',
};

export const serviceSummary_dashboardMeta = {
  name: 'hts-service-summary',
  slot: 'hts-service-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Service Summary',
};

export const clinicalVisit_dashboardMeta = {
  name: 'hts-clinical-visit',
  slot: 'hts-clinical-visit-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Clinical Visit',
};

export const labResults_dashboardMeta = {
  name: 'hts-lab-results',
  slot: 'hts-lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Lab Results',
};

export const drugOrders_dashboardMeta = {
  name: 'hts-drug-orders',
  slot: 'hts-drug-orders-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Drug Orders',
};
