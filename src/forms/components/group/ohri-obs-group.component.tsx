import { Column, Row } from 'carbon-components-react/lib/components/Grid';
import React from 'react';
import { getFieldComponent, getHandler } from '../../registry/registry';
import { OHRIFormFieldProps } from '../../types';
import styles from '../inputs/_input.scss';
export interface ObsGroupProps extends OHRIFormFieldProps {
  deleteControl?: any;
}

export const OHRIObsGroup: React.FC<ObsGroupProps> = ({ question, onChange, deleteControl }) => {
  const groupContent = question.questions
    .filter(groupMember => !groupMember.isHidden)
    .map((groupMember, index) => {
      const component = getFieldComponent(groupMember.questionOptions.rendering);
      if (component) {
        return (
          <Column className={styles.obsGroupColumn}>
            {React.createElement(component, {
              question: groupMember,
              onChange: onChange,
              key: index,
              handler: getHandler(groupMember.type),
            })}
          </Column>
        );
      }
    });
  if (groupContent) {
    groupContent.push(deleteControl);
  }
  return <Row>{groupContent}</Row>;
};
