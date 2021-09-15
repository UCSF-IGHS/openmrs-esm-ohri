import React, { useEffect, useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './dashboard.scss';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('sidenavItems-Covid'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];

  //avoid duplicates by limiting list size to 2 elements
  if (buffer.length <= 2) {
    buffer.push(sidenavItem);
  }

  localStorage.setItem('sidenavItems-Covid', JSON.stringify(buffer));

  return buffer;
};

export const clearCovidSidenavRegistry = () => localStorage.removeItem('sidenavItems-Covid');

export const createCovidDashboardLink = db => {
  const navItems = registerSidenavItem(db);

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }, props) => {
    const [rerender, setRerender] = useState(true);
    const forceRerender = () => setRerender(!rerender);

    document.addEventListener('navigation-from-hts', e => {
      e.preventDefault();
      forceRerender();
    });

    return (
      <div id="sidenav-menu-covid">
        <SideNavMenu
          title="Covid"
          className={styles.noMarker}
          defaultExpanded={isActiveLink(caseReport_dashboardMeta.name)}>
          {navItems.map(navItem => (
            <SideNavMenuItem
              key={navItem.title}
              className={isActiveLink(navItem.name) ? styles.currentNavItem : ''}
              href={`${basePath}/${navItem.name}`}
              onClick={e => {
                handleLinkClick(e, `${basePath}/${navItem.name} `);
                forceRerender();
                document.dispatchEvent(new CustomEvent('navigation-from-covid'));
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

let navigationEvent = new Event('navigation');

export function handleLinkClick(event: any, to: string) {
  event.preventDefault();
  navigate({ to });
}

export const caseReport_dashboardMeta = {
  name: 'covid-case-report',
  slot: 'covid-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Case Report',
};
