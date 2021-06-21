import React, { useEffect, useState } from 'react';
import styles from './ohri-form-sidebar.component.scss';
import { scrollIntoView } from '../../../utils/ohri-sidebar';

function OHRIFormSidebarSection({ label, currentPage }) {
  // TODO: Add validation to components to activate page section.
  const [selectedPage, setSelectedPage] = useState(false);

  const setSidebar = value => {
    if (value === label) {
      console.log(value);
      setSelectedPage(true);
    } else {
      setSelectedPage(false);
    }
  };

  return (
    <div
      className={selectedPage ? styles.sidebarSectionActive : styles.sidebarSection}
      onClick={() => {
        setSidebar(label);
        scrollIntoView(label);
      }}>
      <div className={styles.sidebarSectionLink}>{label}</div>
    </div>
  );
}

export default OHRIFormSidebarSection;
