import React from 'react';
import { SideNav, SideNavItems } from '@carbon/react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';

import styles from './ohri-dashboard-side-nav.scss';

const OHRIDashboardSideNav = () => {
  const { t } = useTranslation();
  return (
    <SideNav isFixedNav expanded={true} isChildOfHeader={false} aria-label="Side navigation" className={styles.sideNav}>
      <SideNavItems>
        <ExtensionSlot name="dashboard-links-slot" />

        <p className={styles.sideNavTextHeader}>{t('programmes', 'Programmes')}</p>

        <ExtensionSlot name="dashboard-slot" />
      </SideNavItems>
    </SideNav>
  );
};

export default OHRIDashboardSideNav;
