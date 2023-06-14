import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import last from 'lodash-es/last';
import { ConfigurableLink } from '@openmrs/esm-framework';
import styles from './dashboardextension.scss';

export interface DashboardExtensionProps {
  path: string;
  title: string;
  basePath: string;
  linkText?: string;
}

export const DashboardExtension = ({ path, title, basePath, linkText }: DashboardExtensionProps) => {
  const location = window.location ?? { pathname: '' };
  const navLink = useMemo(() => decodeURIComponent(last(location.pathname.split('/'))), [location.pathname]);
  const activeClassName = linkText === navLink ? 'active-left-nav-link' : 'non-active'; // add condition if title or linkText

  return (
    <div key={path} className={activeClassName}>
      <ConfigurableLink
        to={`${basePath}/${encodeURIComponent(path)}`}
        className={`cds--side-nav__link ${path === navLink && 'active-left-nav-link'} ${styles.link}`}>
        {linkText || title}
      </ConfigurableLink>
    </div>
  );
};
