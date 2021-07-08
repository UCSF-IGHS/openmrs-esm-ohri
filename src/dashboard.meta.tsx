import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { SideNav, SideNavMenu, SideNavMenuItem } from 'carbon-components-react';

export const createDashboardLink = db => {
  const DashboardLink: React.FC<{ basePath: string }> = ({ basePath }) => {
    return (
      // <div key={db.name}>
      //   <ConfigurableLink to={`${basePath}/${db.name}`} className="bx--side-nav__link">
      //     {db.title}
      //   </ConfigurableLink>
      // </div>
      <SideNavMenu title="HIV">
        <SideNavMenuItem href={`${basePath}/${db.name}`}> HTS </SideNavMenuItem>
        <SideNavMenuItem> Care and Treatment </SideNavMenuItem>
        <SideNavMenuItem> PMTCT </SideNavMenuItem>
      </SideNavMenu>
    );
  };
  return DashboardLink;
};

export const dashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'HTS Sessions',
};
