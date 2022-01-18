import React, { useEffect, useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';
import Events from '../utils/events';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(covidAssessments_dashboardMeta.name) !== -1 ||
  pathname.indexOf(covidLabResults_dashboardMeta.name) !== -1 ||
  pathname.indexOf(covidVaccinations_dashboardMeta.name) !== -1;

const menuItems = 3;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('sidenavItems-Covid'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];
  buffer.push(sidenavItem);

  localStorage.setItem('sidenavItems-Covid', JSON.stringify(buffer));
  return buffer;
};

export const clearCovidSidenavRegistry = () => localStorage.removeItem('sidenavItems-Covid');

export const createCovidDashboardLink = db => {
  const navItems = registerSidenavItem(db);
  const styling = navItems.length === menuItems ? styles.noMarker : styles.hide;

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }, props) => {
    const [rerender, setRerender] = useState(true);
    const forceRerender = () => setRerender(!rerender);

    Events.subscribe('navigation-from-hiv', e => {
      e.preventDefault();
      forceRerender();
    });

    return (
      <div id="sidenav-menu-covid">
        <SideNavMenu title="COVID" className={styling} defaultExpanded={shouldSidemenuBeExpanded()}>
          {navItems.map(navItem => (
            <SideNavMenuItem
              key={navItem.title}
              className={isActiveLink(navItem.name) ? styles.currentNavItem : ''}
              href={`${basePath}/${navItem.name}`}
              onClick={e => {
                handleLinkClick(e, `${basePath}/${navItem.name} `);
                forceRerender();
                Events.dispatch('navigation-from-covid');
              }}>
              {navItem.title}
            </SideNavMenuItem>
          ))}
        </SideNavMenu>
      </div>
    );
  };
  return DashboardLink;
};

export function handleLinkClick(event: any, to: string) {
  event.preventDefault();
  navigate({ to });
}

export const covidAssessments_dashboardMeta = {
  name: 'covid-assessments',
  slot: 'covid-assessments-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Assessments',
};

export const covidLabResults_dashboardMeta = {
  name: 'covid-lab-results',
  slot: 'covid-lab-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Lab Test',
};

export const covidVaccinations_dashboardMeta = {
  name: 'covid-vaccinations',
  slot: 'covid-vaccinations-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Vaccinations',
};
