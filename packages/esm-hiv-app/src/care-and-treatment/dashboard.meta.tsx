import React, { useState } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { navigate } from '@openmrs/esm-framework';
import styles from '../dashboard.scss';
import Events from '../../../esm-ohri-core-app/src/utils/events';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;
const shouldSidemenuBeExpanded = (pathname = window.location.pathname) =>
  pathname.indexOf(encodeURIComponent(serviceSummary_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(programManagement_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(visits_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(labResults_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(generalCounselling_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(adherenceCounselling_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(partnerNotificationServices_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(medications_dashboardMeta.title)) !== -1 ||
  pathname.indexOf(encodeURIComponent(appointments_dashboardMeta.title)) !== -1;

// TODO This needs to be refactored to automatically get the length/size
const menuItems = 9;

const registerSidenavItem = sidenavItem => {
  let buffer;
  const registry = JSON.parse(localStorage.getItem('hiv-care-and-treatment-sidenavItems'));

  //check if List exists, if not initialize it
  buffer = registry ? registry : [];
  buffer.push(sidenavItem);

  localStorage.setItem('hiv-care-and-treatment-sidenavItems', JSON.stringify(buffer));

  return buffer;
};

export const clearCareAndTreatmentSidenavRegistry = () =>
  localStorage.removeItem('hiv-care-and-treatment-sidenavItems');

export const createCareAndTreatmentDashboardLink = db => {
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
      <SideNavMenu title="HIV Care and Treatment" className={styling} defaultExpanded={shouldSidemenuBeExpanded()}>
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

export const serviceSummary_dashboardMeta = {
  slot: 'hts-service-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Service Summary',
};

export const labResults_dashboardMeta = {
  slot: 'hts-lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Labs',
};

export const programManagement_dashboardMeta = {
  slot: 'program-management-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Program Management',
};

export const visits_dashboardMeta = {
  slot: 'visits-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Visits',
};

export const generalCounselling_dashboardMeta = {
  slot: 'general-counselling-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'General Counselling',
};

export const adherenceCounselling_dashboardMeta = {
  slot: 'adherence-counselling-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Adherence Counselling',
};

export const partnerNotificationServices_dashboardMeta = {
  slot: 'partner-notification-services-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Partner Notification Services',
};

export const medications_dashboardMeta = {
  slot: 'medications-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Medications',
};

export const appointments_dashboardMeta = {
  slot: 'appointments-summary-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Appointments',
};
