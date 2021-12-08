import React from 'react';
import { Home32, ListBulleted32, Medication32, Coronavirus32, Calendar32 } from '@carbon/icons-react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { ExtensionSlot, navigate } from '@openmrs/esm-framework';

export const clearDashboardSidenavRegistry = () => localStorage.removeItem('ohri-dashboard-sidenav-items');

export const createOHRIDashboardLink = meta => {
  const NavItem: React.FC<{}> = props => {
    if (meta.isFolder) {
      return (
        <SideNavMenu renderIcon={Home32} title={meta.title}>
          <ExtensionSlot extensionSlotName={meta.slot} />
        </SideNavMenu>
      );
    } else {
      return (
        <SideNavMenuItem
          href={`dashboard/${meta.name}`}
          onClick={e => {
            e.preventDefault();
            navigate({ to: `${window.spaBase}/dashboard/${meta.name}` });
          }}>
          {meta.title}
        </SideNavMenuItem>
      );
    }
  };
  return NavItem;
};

export const tbFolder = {
  name: 'tb-folder',
  slot: 'tb-links-slot',
  config: { columns: 1, type: 'grid', icon: { Home32 } },
  isFolder: true,
  title: 'TB',
};

export const tbCareDashboard = {
  name: 'tb-care',
  slot: 'tb-care-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: { Home32 } },
  title: 'TB Care',
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
