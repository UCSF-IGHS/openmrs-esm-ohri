import React, { useEffect } from 'react';
import { ExtensionSlot, useLayoutType } from '@openmrs/esm-framework';
import { SideNavItems, SideNavMenu } from '@carbon/react';
import styles from './dashboard-group.scss';
import { registerNavGroup } from './nav-group';

export interface DashboardGroupExtensionProps {
  title: string;
  slotName?: string;
  basePath: string;
  isExpanded?: boolean;
  isChild?: boolean;
}

export const DashboardGroupExtension: React.FC<DashboardGroupExtensionProps> = ({
  title,
  slotName,
  basePath,
  isExpanded = true,
  isChild,
}) => {
  const isTablet = useLayoutType() === 'tablet';

  useEffect(() => {
    registerNavGroup(slotName);
  }, [slotName]);

  return (
    <SideNavItems className={styles.sideMenuItems} isSideNavExpanded={true}>
      <SideNavMenu
        className={isChild ? styles.sideNavMenu : ''}
        large={isTablet}
        defaultExpanded={isExpanded}
        title={title}
      >
        <ExtensionSlot
          style={{ width: '100%', minWidth: '15rem' }}
          name={slotName || `dashboard${title}`}
          state={{
            basePath,
            moduleName: '@ohri/openmrs-esm-ohri-commons-lib',
          }}
        />
      </SideNavMenu>
    </SideNavItems>
  );
};
