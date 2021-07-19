import React from 'react';
import { HeaderMenu, HeaderMenuItem } from 'carbon-components-react';
import styles from './hiv-top-nav.overrides.css';

function HIVTopNav() {
  return (
    <HeaderMenu
      aria-label="hiv-top-nav"
      menuLinkName="HIV: HTS"
      className={[styles.noMarker, styles.fullHeight].join(' ')}>
      <HeaderMenuItem href="/openmrs/spa/ohri-home">HIV: HTS</HeaderMenuItem>
      <HeaderMenuItem>HIV: Care and Treatment</HeaderMenuItem>
    </HeaderMenu>
  );
}

export default HIVTopNav;
