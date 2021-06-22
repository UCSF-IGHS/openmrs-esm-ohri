import React, { useState } from 'react';
import styles from './ohri-form-sidebar.component.scss';
import { scrollIntoView } from '../../../utils/ohri-sidebar';

function OHRIFormSidebar({ currentPage }) {
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (selected) => {
    setActiveLink(selected);
    scrollIntoView(selected.replace(/\s/g, ''));
  }

  return (<div className={styles.leftNavWrapper}>
    {
      currentPage.map((page, index) => {
        return (
          <div
            className={(page.label === activeLink) ? styles.sidebarSectionActive : styles.sidebarSection}

            key={index}
            onClick={() => handleClick(page.label)}
          >
            <div className={styles.sidebarSectionLink}>{page.label}</div>
          </div>
        )
      })
    }
  </div>)
}

export default OHRIFormSidebar;
