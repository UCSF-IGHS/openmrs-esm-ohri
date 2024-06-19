import React, { useCallback, useEffect, useState } from 'react';
import { SideNavLink, SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { ExtensionSlot, navigate } from '@openmrs/esm-framework';
import styles from './sidenav-links.scss';

export const createOHRIDashboardLink = (meta) => {
  const NavItem: React.FC<{}> = (props) => {
    const [isSelected, setIsSelected] = useState(false);

    const toggleHighlightedItem = useCallback((evt) => {
      if (!meta.isFolder) {
        setIsSelected(evt['detail'].newUrl.includes(`${window.spaBase}/dashboard/${meta.name}`));
      }
    }, []);

    useEffect(() => {
      setIsSelected(location.href.includes(`${window.spaBase}/dashboard/${meta.name}`));
      window.addEventListener('single-spa:before-routing-event', toggleHighlightedItem);
      return () => window.removeEventListener('single-spa:before-routing-event', toggleHighlightedItem);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (meta.isFolder) {
      return (
        <SideNavMenu renderIcon={meta.config?.icon} title={meta.title}>
          <ExtensionSlot name={meta.slot} />
        </SideNavMenu>
      );
    } else if (meta.isLink) {
      return (
        <SideNavLink
          renderIcon={meta.config.icon}
          href={`dashboard/${meta.name}`}
          onClick={(e) => {
            e.preventDefault();
            navigate({ to: `${window.spaBase}/dashboard/${meta.name}` });
          }}
          className={isSelected ? styles.currentNavItem : ''}
        >
          {meta.title}
        </SideNavLink>
      );
    } else {
      return (
        <SideNavMenuItem
          href={`dashboard/${meta.name}`}
          onClick={(e) => {
            e.preventDefault();
            navigate({ to: `${window.spaBase}/dashboard/${meta.name}` });
          }}
          className={isSelected ? styles.currentNavItem : ''}
        >
          {meta.title}
        </SideNavMenuItem>
      );
    }
  };
  return NavItem;
};
