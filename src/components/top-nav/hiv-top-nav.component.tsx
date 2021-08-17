import React from 'react';
import { HeaderMenu, HeaderMenuItem } from 'carbon-components-react';
import styles from './hiv-top-nav.overrides.scss';
import './sidenav.overrides.css';
import linkList from './hts-top-nav-links';
import { handleLinkClick } from '../../dashboard.meta';

function HIVTopNav() {
  return (
    <HeaderMenu aria-label="hiv-top-nav" menuLinkName="HIV: HTS" className={styles.headerMenuOverrides}>
      {linkList.map(link => (
        <HeaderMenuItem href={link.url} key={link.title} onClick={e => handleLinkClick(e, link.url)}>
          {' '}
          {link.title}{' '}
        </HeaderMenuItem>
      ))}
    </HeaderMenu>
  );
}

export default HIVTopNav;
