import React, { useMemo } from 'react';
import classNames from 'classnames';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigurableLink } from '@openmrs/esm-framework';
import { SideNavMenu, SideNavItems } from '@carbon/react';

interface DashboardLinkConfig {
  name: string;
  title: string;
  isFolder: boolean;
  folderTitle: string;
  folderIcon: React.ComponentType<any>;
  childLinks?: Array<any>;
  isHidden?: boolean;
}

function DashboardExtension({ dashboardLinkConfig }: { dashboardLinkConfig: DashboardLinkConfig }) {
  const { t } = useTranslation();
  const { name, title, isFolder, folderTitle, folderIcon, childLinks, isHidden } = dashboardLinkConfig;
  const location = useLocation();
  const spaBasePath = `${window.spaBase}/home`;

  const navLink = useMemo(() => {
    const pathArray = location.pathname.split('/home');
    const lastElement = pathArray[pathArray.length - 1];
    return decodeURIComponent(lastElement);
  }, [location.pathname]);

  if (isHidden) {
    return;
  }

  if (isFolder) {
    return (
      <SideNavItems>
        <SideNavMenu title={t(folderTitle)} renderIcon={folderIcon}>
          <ConfigurableLink
            className={classNames('cds--side-nav__link', {
              'active-left-nav-link': navLink.match(name),
            })}
            to={`${spaBasePath}/${name}`}
          >
            {t(title)}
          </ConfigurableLink>
          {Array.isArray(childLinks) &&
            childLinks.map((childLink, childIndex) => (
              <ConfigurableLink
                key={childIndex}
                className={classNames('cds--side-nav__link', {
                  'active-left-nav-link': navLink.match(childLink.name),
                })}
                to={`${spaBasePath}/${childLink.name}`}
              >
                {t(childLink.title)}
              </ConfigurableLink>
            ))}
        </SideNavMenu>
      </SideNavItems>
    );
  } else {
    return (
      <SideNavItems>
        <ConfigurableLink
          className={classNames('cds--side-nav__link', {
            'active-left-nav-link': navLink.match(name),
          })}
          to={`${spaBasePath}/${name}`}
        >
          {t(title)}
        </ConfigurableLink>
      </SideNavItems>
    );
  }
}

export const createOHRIGroupedLink = (dashboardLinkConfig: DashboardLinkConfig) => () => (
  <BrowserRouter>
    <DashboardExtension dashboardLinkConfig={dashboardLinkConfig} />
  </BrowserRouter>
);
