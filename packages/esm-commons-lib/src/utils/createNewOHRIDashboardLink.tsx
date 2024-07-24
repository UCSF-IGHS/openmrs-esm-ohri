import React, { useMemo } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { navigate } from '@openmrs/esm-framework';
import { SideNavLink } from '@carbon/react';
import ConditionalNavLinkRenderer from '../components/extension-conditional-renderer/side-nav-renderer';

import styles from './sidenav-links.scss';

interface DashboardLinkConfig {
  name: string;
  title: string;
  icon: React.ComponentType<any>;
  configKey?: string;
}

function NewDashboardExtension({ dashboardLinkConfig }: { dashboardLinkConfig: DashboardLinkConfig }) {
  const { name, title, icon } = dashboardLinkConfig;
  const location = useLocation();
  const spaBasePath = `${window.spaBase}/home`;

  const navLink = useMemo(() => {
    const pathArray = location.pathname.split('/home');
    const lastElement = pathArray[pathArray.length - 1];
    return decodeURIComponent(lastElement);
  }, [location.pathname]);

  return (
    <SideNavLink
      renderIcon={icon}
      href={`${spaBasePath}/${name}`}
      onClick={(e) => {
        e.preventDefault();
        navigate({ to: `${spaBasePath}/${name}` });
      }}
      className={navLink.match(name) ? styles.currentNavItem : ''}
    >
      {title}
    </SideNavLink>
  );
}

export const createNewOHRIDashboardLink = (dashboardLinkConfig: DashboardLinkConfig) => () => (
  <ConditionalNavLinkRenderer conditionalConfigKey={dashboardLinkConfig.configKey}>
    <BrowserRouter>
      <NewDashboardExtension dashboardLinkConfig={dashboardLinkConfig} />
    </BrowserRouter>
  </ConditionalNavLinkRenderer>
);
