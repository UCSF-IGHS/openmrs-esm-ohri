import React, { useState } from 'react';
import styles from './_section.scss';
import { getFieldComponent, getHandler } from '../../registry/registry';
import { OHRIUnspecified } from '../inputs/unspecified/ohri-unspecified.component';

const OHRIFormSection = ({ fields, onFieldChange, sectionTitle, showTitle }) => {
  return (
    <div className={styles.container}>
      {showTitle && <h4 className={styles.sectionTitle}>{sectionTitle}</h4>}
      {fields.map((value, index) => {
        let appendUnspecifiedWidget =
          value.unspecified &&
          value.questionOptions.rendering != 'toggle' &&
          value.questionOptions.rendering != 'encounter-location';
        const component = getFieldComponent(value.questionOptions.rendering);
        if (component) {
          const qnFragment = React.createElement(component, {
            question: value,
            onChange: onFieldChange,
            key: new Date().getTime(),
            handler: getHandler(value.type),
          });

          return appendUnspecifiedWidget ? (
            <>
              {qnFragment}
              <OHRIUnspecified question={value} />
            </>
          ) : (
            qnFragment
          );
        }
      })}
    </div>
  );
};

export default OHRIFormSection;
