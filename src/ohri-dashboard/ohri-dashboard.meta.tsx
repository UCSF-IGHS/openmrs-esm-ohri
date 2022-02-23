import React, { useCallback, useEffect, useState } from 'react';
import { Home32, ListBulleted32, Medication32, Coronavirus32, Calendar32 } from '@carbon/icons-react';
import { SideNavLink, SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { ExtensionSlot, navigate } from '@openmrs/esm-framework';
import styles from '../utils/sidenav-links.scss';

export const createOHRIDashboardLink = meta => {
  const NavItem: React.FC<{}> = props => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleHighlightedItem = useCallback(evt => {
      if (!meta.isFolder) {
        setIsSelected(evt['detail'].newUrl.includes(`${window.spaBase}/dashboard/${meta.name}`));
      }
    }, []);

    useEffect(() => {
      setIsSelected(location.href.includes(`${window.spaBase}/dashboard/${meta.name}`));
      window.addEventListener('single-spa:before-routing-event', toggleHighlightedItem);
      return () => window.removeEventListener('single-spa:before-routing-event', toggleHighlightedItem);
    }, []);

    if (meta.isFolder) {
      return (
        <SideNavMenu renderIcon={meta.config.icon} title={meta.title}>
          <ExtensionSlot extensionSlotName={meta.slot} />
        </SideNavMenu>
      );
    } else if (meta.isLink) {
      return (
        <SideNavLink
          renderIcon={meta.config.icon}
          href={`dashboard/${meta.name}`}
          onClick={e => {
            e.preventDefault();
            navigate({ to: `${window.spaBase}/dashboard/${meta.name}` });
          }}
          className={isSelected ? styles.currentNavItem : ''}>
          {meta.title}
        </SideNavLink>
      );
    } else {
      return (
        <SideNavMenuItem
          href={`dashboard/${meta.name}`}
          onClick={e => {
            e.preventDefault();
            navigate({ to: `${window.spaBase}/dashboard/${meta.name}` });
          }}
          className={isSelected ? styles.currentNavItem : ''}>
          {meta.title}
        </SideNavMenuItem>
      );
    }
  };
  return NavItem;
};

export const homeDashboardMeta = {
  name: 'home',
  slot: 'home-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Home32 },
  isLink: true,
  title: 'Home',
};

export const patientListDashboardMeta = {
  name: 'patient-lists',
  slot: 'patient-lists-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: ListBulleted32 },
  title: 'Patient Lists',
};

export const appointmentsDashboardMeta = {
  name: 'appointments',
  slot: 'appointments-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Calendar32 },
  title: 'Appointments',
};

export const pharmacyDashboardMeta = {
  name: 'pharmacy',
  slot: 'pharmacy-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Medication32 },
  title: 'Pharmacy',
};

export const hivFolderDashboardMeta = {
  name: 'hiv',
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

export const covidFolderDashboardMeta = {
  name: 'covid',
  slot: 'covid-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Coronavirus32 },
  isFolder: true,
  title: 'COVID',
};

export const covid19CasesDashboardMeta = {
  name: 'covid-cases',
  slot: 'covid-cases-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'covid', dashboardTitle: 'COVID-19 Home Page' },
  title: 'COVID-19 Cases',
};
