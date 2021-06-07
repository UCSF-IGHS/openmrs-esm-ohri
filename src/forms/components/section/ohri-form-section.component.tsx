import React from 'react';
import { getFieldComponent, getHandler } from '../../registry/registry';

const OHRIFormSection = ({ fields, onFieldChange, sectionTitle }) => {
  return (
    <div style={{ marginBottom: '3.063rem', borderBottom: 'solid 1px rgba(107, 104, 104, 0.5)' }}>
      <h4 style={{ margin: '10px 0px 10px 0px' }}>{sectionTitle}</h4>
      {fields.map((question, index) => {
        const component = getFieldComponent(question.questionOptions.rendering);
        if (component) {
          return React.createElement(component, {
            question: question,
            onChange: onFieldChange,
            key: index,
            handler: getHandler(question.type),
          });
        }
      })}
    </div>
  );
};

export default OHRIFormSection;
