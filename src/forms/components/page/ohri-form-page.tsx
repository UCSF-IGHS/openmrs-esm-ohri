import React from 'react';
import styles from './_page.scss';
import OHRIFormSection from '../section/ohri-form-section.component';
import { Waypoint } from 'react-waypoint';
import { Toggle } from 'carbon-components-react';

function OHRIFormPage({ page, onFieldChange, setSelectedPage }) {
  let newLabel = page.label.replace(/\s/g, '');

  const handleEnter = elementID => {
    setSelectedPage(elementID);
  };

  return (
    <Waypoint onEnter={() => handleEnter(newLabel)} bottomOffset="95%">
      <div id={newLabel} className={styles.pageContent}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p className={styles.pageTitle}>{page.label}</p>
          <div style={{ marginLeft: '-300px' }}>
            <Toggle
              size="sm"
              aria-label="toggle button"
              defaultToggled
              id="showHideSections"
              labelA="Expand sections"
              labelB="Collapse sections"
            />
          </div>
        </div>
        {/* <p className={styles.required}>All fields are required unless marked optional</p> */}
        {page.sections.map((sec, index) => {
          return (
            <div className={styles.formSection} key={index}>
              <OHRIFormSection
                fields={sec.questions}
                showTitle={page.sections.length > 1}
                onFieldChange={onFieldChange}
                sectionTitle={sec.label}
                key={index}
              />
            </div>
          );
        })}
        <hr className={styles.divider} />
      </div>
    </Waypoint>
  );
}

export default OHRIFormPage;
