import React, { useState } from 'react';
import styles from './_page.scss';
import OHRIFormSection from '../section/ohri-form-section.component';
import { Waypoint } from 'react-waypoint';
import { Accordion, AccordionItem, Toggle } from 'carbon-components-react';

function OHRIFormPage({ page, onFieldChange, setSelectedPage }) {
  let newLabel = page.label.replace(/\s/g, '');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleEnter = elementID => {
    setSelectedPage(elementID);
  };

  const toggleCollapsedStatus = e => {
    setIsCollapsed(e);
  };

  return (
    <Waypoint onEnter={() => handleEnter(newLabel)} bottomOffset="95%">
      <div id={newLabel} className={styles.pageContent}>
        <div style={{}} className={styles.pageHeader}>
          <p className={styles.pageTitle}>{page.label}</p>
          <div className={styles.collapseToggle}>
            <Toggle
              size="sm"
              aria-label="toggle button"
              defaultToggled
              id={`${newLabel}-toggle`}
              labelA="Expand sections"
              labelB="Collapse sections"
              onToggle={toggleCollapsedStatus}
            />
          </div>
        </div>
        <Accordion>
          {/* <p className={styles.required}>All fields are required unless marked optional</p> */}
          {page.sections.map((sec, index) => {
            return (
              <AccordionItem title={sec.label} open={isCollapsed} className={styles.sectionContent}>
                <div className={styles.formSection} key={index}>
                  <OHRIFormSection
                    fields={sec.questions}
                    showTitle={page.sections.length > 1}
                    onFieldChange={onFieldChange}
                    sectionTitle={sec.label}
                    key={index}
                  />
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
        <hr className={styles.divider} />
      </div>
    </Waypoint>
  );
}

export default OHRIFormPage;
