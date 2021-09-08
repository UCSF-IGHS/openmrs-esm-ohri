import React, { useCallback, useState } from 'react';
import styles from './_section.scss';
import { getFieldComponent, getHandler } from '../../registry/registry';
import { OHRIUnspecified } from '../inputs/unspecified/ohri-unspecified.component';
import { OHRIFormField } from '../../types';

const OHRIFormSection = ({ fields, onFieldChange, sectionTitle, showTitle }) => {
  const getFieldControl = useCallback((question: OHRIFormField) => {
    // Check if a concept wasn't provided
    if (question.type == 'obs' && !question.questionOptions.concept) {
      // Disable the control
      question.disabled = true;
      // Since we don't have a concept, just render a text input
      return getFieldComponent('text');
    }
    return getFieldComponent(question.questionOptions.rendering);
  }, []);
  return (
    <div className={styles.container}>
      {showTitle && <h4 className={styles.sectionTitle}>{sectionTitle}</h4>}
      {fields.map((value, index) => {
        let appendUnspecifiedWidget =
          value.unspecified &&
          value.questionOptions.rendering != 'toggle' &&
          value.questionOptions.rendering != 'encounter-location';
        const component = getFieldControl(value);
        if (component) {
          const qnFragment = React.createElement(component, {
            question: value,
            onChange: onFieldChange,
            key: index,
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
