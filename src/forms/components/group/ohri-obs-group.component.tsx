import { Column, Row } from 'carbon-components-react/lib/components/Grid';
import React from 'react';
import { getFieldComponent, getHandler } from '../../registry/registry';
import { OHRIFormFieldProps } from '../../types';

export const OHRIObsGroup: React.FC<OHRIFormFieldProps> = ({ question, onChange }) => {
  const groupContent = question.questions.map((groupMember, index) => {
    const component = getFieldComponent(groupMember.questionOptions.rendering);
    if (component) {
      return (
        <div style={{ width: '50%' }}>
          {React.createElement(component, {
            question: groupMember,
            onChange: onChange,
            key: index,
            handler: getHandler(groupMember.type),
          })}
        </div>
      );
    }
  });
  return <div style={{ display: 'flex', width: '100%' }}>{groupContent}</div>;
};
