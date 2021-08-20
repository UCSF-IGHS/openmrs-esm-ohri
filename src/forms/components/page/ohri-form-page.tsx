import React from 'react';
import styles from './_page.scss';
import OHRIFormSection from '../section/ohri-form-section.component';
import { Waypoint } from 'react-waypoint';

function OHRIFormPage({ page, onFieldChange, setSelectedPage }) {
  let newLabel = page.label.replace(/\s/g, '');

  const handleEnter = elementID => {
    setSelectedPage(elementID);
  };

  return (
    <Waypoint onEnter={() => handleEnter(newLabel)} bottomOffset="95%">
      <div id={newLabel}>
        <p className={styles.pageTitle}>{page.label}</p>
        <p className={styles.required}>All fields are required unless marked optional</p>
        {page.sections.map((sec, index) => {
          return (
            <div className={styles.formSection} key={index}>
              <OHRIFormSection
                fields={sec.questions}
                showTitle={page.sections.length > 1}
                onFieldChange={onFieldChange}
                sectionTitle={sec.label}
              />
            </div>
          );
        })}
      </div>
    </Waypoint>
  );
}

export default OHRIFormPage;
