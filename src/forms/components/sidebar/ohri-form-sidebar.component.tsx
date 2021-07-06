import React, { useState } from 'react';
import styles from './ohri-form-sidebar.component.scss';
import { scrollIntoView } from '../../../utils/ohri-sidebar';

function OHRIFormSidebar({ currentPage, selectedPage }) {
  const [activeLink, setActiveLink] = useState(selectedPage);

  const joinWord = value => {
    return value.replace(/\s/g, '');
  };

  const handleClick = selected => {
    const activeID = selected.replace(/\s/g, '');
    setActiveLink(selected);
    scrollIntoView(activeID);
  };

  return (
    <div className={styles.leftNavWrapper}>
      {currentPage.map((page, index) => {
        return (
          <div
            aria-hidden="true"
            className={joinWord(page.label) === selectedPage ? styles.sidebarSectionActive : styles.sidebarSection}
            key={index}
            onClick={() => handleClick(page.label)}>
            <div className={styles.sidebarSectionLink}>{page.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export default OHRIFormSidebar;
