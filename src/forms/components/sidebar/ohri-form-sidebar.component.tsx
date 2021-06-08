import { Link } from 'carbon-components-react';
import React from 'react';
import styles from './ohri-form-sidebar.component.scss';
import XAxis16 from '@carbon/icons-react/es/x-axis/16';
import { scrollIntoView } from '../../../utils/ohri-sidebar';

function OHRIFormSidebar({ pages }) {
  const navItems = pages.map((page, index) => (
    <div className={styles.space05} key={index}>
      <Link className={styles.link} onClick={() => scrollIntoView(page.label)}>
        <XAxis16 /> {page.label}
      </Link>
    </div>
  ));
  return <div className={styles.leftNavWrapper}>{navItems}</div>;
}

export default OHRIFormSidebar;
