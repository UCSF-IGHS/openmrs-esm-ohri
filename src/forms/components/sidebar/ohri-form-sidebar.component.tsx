import React from 'react';
import { Link } from 'carbon-components-react';
import styles from './ohri-form-sidebar.component.scss';
import OHRIFormSidebarSection from './ohri-form-sidebar-section.component';

function OHRIFormSidebar({ pages, currentPage }) {
  const navItems = pages.map((page, index) => (
    <div className={styles.sectionWrapper} key={index}>
      <OHRIFormSidebarSection label={page.label} currentPage={currentPage} />
    </div>
  ));
  return <div className={styles.leftNavWrapper}>{navItems}</div>;
}

export default OHRIFormSidebar;
