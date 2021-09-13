import React, { useState } from 'react';
import { HeaderMenu, HeaderMenuItem } from 'carbon-components-react';
import styles from './ohri-programme-switcher.overrides.scss';
import './sidenav.overrides.css';
import linkList from './ohri-programme-switcher-links';
import { handleLinkClick } from '../../dashboard.meta';
import { useTranslation } from 'react-i18next';

const isActiveLink = urlFragment => window.location.pathname.indexOf(urlFragment) !== -1;

function HIVTopNav() {
  const { t } = useTranslation();
  const [menuLinkName, setMenuLinkName] = useState(t('selectProgramme', 'Select a programme').toString());

   

  const onProgrammeSwitch = (event, url, programmeTitle) => {
    setMenuLinkName(programmeTitle);
    handleLinkClick(event, url);
  };

  return (
    <HeaderMenu aria-label="hiv-top-nav" menuLinkName={menuLinkName} className={styles.headerMenuOverrides}>
      {linkList.map(link => (
        <HeaderMenuItem href={link.url} key={link.title} onClick={e => onProgrammeSwitch(e, link.url, link.title)} isCurrentPage={isActiveLink(link.url)}>
          {' '}
          {link.title}{' '}
        </HeaderMenuItem>
      ))}
    </HeaderMenu>
  );
}

export default HIVTopNav;
