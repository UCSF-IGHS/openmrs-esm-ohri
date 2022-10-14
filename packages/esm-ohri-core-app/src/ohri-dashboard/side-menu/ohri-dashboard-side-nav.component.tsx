import React from 'react';
import { SideNav, SideNavItems, SideNavLink } from '@carbon/react';
import styles from './ohri-dashboard-side-nav.scss';
import { ListBulleted, Calendar } from '@carbon/react/icons';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

const OHRIDashboardSideNav = () => {
  const { t } = useTranslation();
  return (
    <SideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation" className={styles.sideNav}>
      <SideNavItems>
        <ExtensionSlot extensionSlotName="dashboard-links-slot" />

        {/* Remove once we have dashboards */}
        <div>
          <SideNavLink renderIcon={ListBulleted} href="javascript:void(0)">
            {t('patientLists', 'Patient Lists')}
          </SideNavLink>
          <SideNavLink renderIcon={Calendar} href="javascript:void(0)">
            {t('appointments', 'Appointments')}
          </SideNavLink>
        </div>

        <p className={styles.sideNavTextHeader}>{t('myDashboards', 'My Dashboards')}</p>

        <ExtensionSlot extensionSlotName="dashboard-slot" />
      </SideNavItems>
    </SideNav>
  );
};

export default OHRIDashboardSideNav;
