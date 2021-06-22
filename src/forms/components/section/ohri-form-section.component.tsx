import React from 'react';
import styles from './_section.scss';
import { getFieldComponent, getHandler } from '../../registry/registry';

const OHRIFormSection = ({ fields, onFieldChange, sectionTitle, showTitle }) => {
  return (
    <div className={styles.container}>
      {showTitle && <h4 className={styles.sectionTitle}>{sectionTitle}</h4>}
      {fields.map((value, index) => {
        const component = getFieldComponent(value.questionOptions.rendering);
        if (component) {
          return React.createElement(component, {
            question: value,
            onChange: onFieldChange,
            key: index,
            handler: getHandler(value.type),
          });
        }
      })}
    </div>
  );
};

export default OHRIFormSection;
