import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink, navigate } from '@openmrs/esm-framework';
import { SideNavLink, SideNavMenu, SideNavMenuItem, Button } from '@carbon/react';
import styles from './sidenav-links.scss';

interface DashboardLinkConfig {
  name: string;
  title: string;
  icon: React.ComponentType<any>;
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
  <BrowserRouter>
    <NewDashboardExtension dashboardLinkConfig={dashboardLinkConfig} />
  </BrowserRouter>
);
