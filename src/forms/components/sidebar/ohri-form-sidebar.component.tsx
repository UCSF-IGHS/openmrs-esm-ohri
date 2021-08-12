import React, { useState } from 'react';
import styles from './ohri-form-sidebar.component.scss';
import { scrollIntoView } from '../../../utils/ohri-sidebar';
import { Button } from 'carbon-components-react';

function OHRIFormSidebar({ currentPage, selectedPage, mode, onCancel, handleClose }) {
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
    <div className={styles.sidebar}>
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
      <hr className={styles.sideBarHorizontalLine} />
      {mode != 'view' && (
        <Button style={{ marginBottom: '0.625rem', width: '11rem' }} type="submit" >
          Save
        </Button>
      )}
      <Button
        style={{ width: '11rem' }}
        kind="tertiary"
        onClick={() => {
          onCancel ? onCancel() : null;
          handleClose();
        }}>
        {mode == 'view' ? 'Close' : 'Cancel'}
      </Button>
    </div>
  );
}

export default OHRIFormSidebar;
