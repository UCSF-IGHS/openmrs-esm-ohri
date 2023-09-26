/** @module @category UI */
import React from 'react';
import { ExtensionSlot, createGlobalStore, useStore } from '@openmrs/esm-framework';
import { SideNav, SideNavProps } from '@carbon/react';
import styles from './left-nav.module.scss';
import { useTranslation } from 'react-i18next';

interface LeftNavStore {
  slotName: string | null;
  basePath: string;
}

const leftNavStore = createGlobalStore<LeftNavStore>('left-nav', {
  slotName: null,
  basePath: window.spaBase,
});

export function setLeftNav({ name, basePath }) {
  leftNavStore.setState({ slotName: name, basePath });
}

export function unsetLeftNav(name) {
  if (leftNavStore.getState().slotName == name) {
    leftNavStore.setState({ slotName: null });
  }
}

type LeftNavMenuProps = SideNavProps;

export const LeftNavMenu = React.forwardRef<HTMLElement, LeftNavMenuProps>((props, ref) => {
  const { slotName, basePath } = useStore(leftNavStore);
  const currentPath = window.location ?? { pathname: '' };
  const { t } = useTranslation();

  return (
    <SideNav ref={ref} expanded aria-label="Left navigation" className={styles.leftNav} {...props}>
      <ExtensionSlot name="global-nav-menu-slot" />
      {slotName ? <ExtensionSlot name={slotName} state={{ basePath, currentPath }} /> : null}

      <ExtensionSlot name="dashboard-links-slot" />

      <p className={styles.sideNavTextHeader}>{t('programmes', 'Programmes')}</p>

      <ExtensionSlot name="dashboard-slot" />
    </SideNav>
  );
});
