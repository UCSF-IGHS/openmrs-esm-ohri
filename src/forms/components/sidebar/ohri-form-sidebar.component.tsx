import { Link } from 'carbon-components-react';
import React from 'react';
import styles from './ohri-form-sidebar.component.scss';
import XAxis16 from '@carbon/icons-react/es/x-axis/16';

function OHRIFormSidebar({ pages, setCurrentPage }) {
  const navItems = pages.map(page => (
    <Link className={styles.customStyle} onClick={() => setCurrentPage(page)}>
      <XAxis16 /> {page.label}
    </Link>
  ));
  return <div className={styles.leftNavWrapper}>{navItems}</div>;
}

export default OHRIFormSidebar;
