import React from 'react';
import { render } from 'react-dom';
import {
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from 'carbon-components-react/lib/components/UIShell';
import styles from './ohri-dashboard-side-nav.scss';
import { Home32, ListBulleted32, Medication32, Coronavirus32, Calendar32 } from '@carbon/icons-react';
import { Extension, ExtensionSlot } from '@openmrs/esm-framework';

const OHRIDashboardSideNav = () => {
  return (
    <SideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation" className={styles.sideNav}>
      <SideNavItems>
        <SideNavLink renderIcon={Home32} href="/openmrs/spa/home">
          Home
        </SideNavLink>
        <SideNavLink renderIcon={ListBulleted32} href="javascript:void(0)">
          Patient Lists
        </SideNavLink>
        <SideNavLink renderIcon={Calendar32} href="javascript:void(0)">
          Appointments
        </SideNavLink>
        <p className={styles.sideNavTextHeader}>My Dashboards</p>
        <SideNavMenu renderIcon={Home32} title="HIV">
          <ExtensionSlot extensionSlotName="ohri-home-dashboard-slot" />

          <SideNavMenuItem aria-current="page" href="/openmrs/spa/ohri-home">
            HTS (HTS POC Home Screen)
          </SideNavMenuItem>
          <SideNavMenuItem href="/openmrs/spa/ohri-ct-home">Care and Treatment (C&T Home Screen)</SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu renderIcon={Coronavirus32} title="COVID">
          <SideNavMenuItem aria-current="page" href="/openmrs/spa/ohri-covid-home">
            COVID-19 Cases (COVID Home Screen)
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink renderIcon={Medication32} href="javascript:void(0)">
          Pharmacy
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};

export default OHRIDashboardSideNav;
