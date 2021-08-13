import React, { useCallback } from 'react';
import { SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import styles from './dashboard.scss';
import { ConfigurableLink, ExtensionSlot, navigate } from '@openmrs/esm-framework';

export const createDashboardLink = db => {
  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    return (
      <SideNavMenu title="HIV" className={styles.noMarker} defaultExpanded={true}>
        <SideNavMenuItem className={styles.currentNavItem} href={`${basePath}/${db.name}`}>
          {' '}
          HTS{' '}
        </SideNavMenuItem>
        <SideNavMenuItem href={`${basePath}/${db.name}`}>Care and Treatment </SideNavMenuItem>
        <SideNavMenuItem> PMTCT </SideNavMenuItem>
      </SideNavMenu>
    );
  };
  return DashboardLink;
};

export const createDashboardFolder = (folder: {
  folderTitle: string;
  childLinks: Array<{ name: string; title: string; url: string }>;
}) => {
  const DashboardFolder: React.FC<{ basePath: string }> = ({ basePath }) => {
    const navItems = folder.childLinks.map(link => {
      const handleClick = e => {
        e.preventDefault();
        navigate({ to: `${basePath}/${link.url}` });
      };
      return (
        <SideNavMenuItem onClick={handleClick}>
          <ExtensionSlot extensionSlotName={link.title} />
        </SideNavMenuItem>
      );
    });
    return <SideNavMenu title={folder.folderTitle}>{navItems}</SideNavMenu>;
  };
  return DashboardFolder;
};

export const dashboardMeta = {
  hts: {
    name: 'hts-summary',
    slot: 'hts-summary-dashboard-slot',
    config: { columns: 1, type: 'grid' },
    title: 'HTS Sessions',
  },
  careAndTreatment: {
    name: 'care-and-treatment',
    slot: 'care-and-treatment-dashboard-slot',
    config: { columns: 1, type: 'grid' },
    title: 'Service Enrollments',
  },
};
