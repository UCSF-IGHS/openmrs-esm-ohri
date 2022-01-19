import React from 'react';
import { SideNav, SideNavItems, SideNavLink } from 'carbon-components-react/lib/components/UIShell';
import styles from './ohri-dashboard-side-nav.scss';
import { ListBulleted32, Medication32, Calendar32, Coronavirus32 } from '@carbon/icons-react';
import { ExtensionSlot } from '@openmrs/esm-framework';

const OHRIDashboardSideNav = () => {
  return (
    <SideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation" className={styles.sideNav}>
      <SideNavItems>
        <ExtensionSlot extensionSlotName="dashboard-links-slot" />

        {/* Remove once we have dashboards */}
        <div>
          <SideNavLink renderIcon={ListBulleted32} href="javascript:void(0)">
            Patient Lists
          </SideNavLink>
          <SideNavLink renderIcon={Calendar32} href="javascript:void(0)">
            Appointments
          </SideNavLink>
        </div>

        <p className={styles.sideNavTextHeader}>My Dashboards</p>

        <ExtensionSlot extensionSlotName="dashboard-slot" />

        <SideNavLink renderIcon={Medication32} href="javascript:void(0)">
          Pharmacy
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
};

export default OHRIDashboardSideNav;
