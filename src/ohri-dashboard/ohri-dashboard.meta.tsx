import React, { useState } from 'react';
import { Home32, ListBulleted32, Medication32, Coronavirus32, Calendar32 } from '@carbon/icons-react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from './ohri-dashboard.scss';
import Events from '../utils/events';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(htsDashboardMeta.name) !== -1 || pathname.indexOf(careAndTreatmentDashboardMeta.name) !== -1;

const menuItems = 4;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('ohri-dashboard-sidenav-items'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];
  buffer.push(sidenavItem);

  localStorage.setItem('ohri-dashboard-sidenav-items', JSON.stringify(buffer));
  return buffer;
};

export const clearDashboardSidenavRegistry = () => localStorage.removeItem('ohri-dashboard-sidenav-items');

export const createOHRIDashboardLink = db => {
  const navItems = registerSidenavItem(db);
  const styling = navItems.length === menuItems ? styles.noMarker : styles.hide;

  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }, props) => {
    const [rerender, setRerender] = useState(true);
    const forceRerender = () => setRerender(!rerender);

    // Events.subscribe('navigation-from-hiv', e => {
    //     e.preventDefault();
    //     forceRerender();
    // });

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
                // Events.dispatch('navigation-from-covid');
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

export const homeDashboardMeta = {
  name: 'home',
  slot: 'home-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: { Home32 } },
  title: 'Home',
};

export const patientListDashboardMeta = {
  name: 'patient-lists',
  slot: 'patient-lists-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: { ListBulleted32 } },
  title: 'Patient Lists',
};

export const appointmentsDashboardMeta = {
  name: 'appointments',
  slot: 'appointments-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: { Calendar32 } },
  title: 'Appointments',
};

export const hivDashboardMeta = {
  name: 'hiv',
  slot: 'hiv-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: { Home32 } },
  title: 'HIV',
};

export const htsDashboardMeta = {
  name: 'hts',
  slot: 'hts-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HTS',
};

export const careAndTreatmentDashboardMeta = {
  name: 'care-and-treatment',
  slot: 'care-and-treatment-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Care and Treatment',
};

export const covidDashboardMeta = {
  name: 'covid',
  slot: 'covid-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: { Coronavirus32 } },
  title: 'COVID',
};

export const covid19CasesDashboardMeta = {
  name: 'covid-cases',
  slot: 'covid-cases-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'COVID-19 Cases',
};

export const pharmacyDashboardMeta = {
  name: 'pharmacy',
  slot: 'pharmacy-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: { Medication32 } },
  title: 'Pharmacy',
};
