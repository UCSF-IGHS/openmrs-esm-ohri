import React from 'react';
import { getFieldComponent, getHandler } from '../../registry/registry';

const OHRIFormSection = ({ fields, onFieldChange }) => {
  return (
    <div>
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
