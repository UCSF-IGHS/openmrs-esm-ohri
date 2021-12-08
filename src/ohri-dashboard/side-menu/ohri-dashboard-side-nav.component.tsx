import React from 'react';
import { SideNav, SideNavItems, SideNavLink } from 'carbon-components-react/lib/components/UIShell';
import styles from './ohri-dashboard-side-nav.scss';
import { Home32, ListBulleted32, Medication32, Coronavirus32, Calendar32 } from '@carbon/icons-react';
import { ExtensionSlot } from '@openmrs/esm-framework';

const OHRIDashboardSideNav = () => {
  return (
    <SideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation" className={styles.sideNav}>
      <SideNavItems>
        <div>
          <SideNavLink renderIcon={Home32} href="/openmrs/spa/home">
            Home
          </SideNavLink>
          <SideNavLink renderIcon={ListBulleted32} href="javascript:void(0)">
            Patient Lists
          </SideNavLink>
          <SideNavLink renderIcon={Calendar32} href="javascript:void(0)">
            Appointments
          </SideNavLink>
          <SideNavLink renderIcon={Medication32} href="javascript:void(0)">
            Pharmacy
          </SideNavLink>
        </div>
        <p className={styles.sideNavTextHeader}>My Dashboards</p>
        <ExtensionSlot extensionSlotName="dashboard-slot" />
      </SideNavItems>
    </SideNav>
  );
};

export default OHRIDashboardSideNav;
