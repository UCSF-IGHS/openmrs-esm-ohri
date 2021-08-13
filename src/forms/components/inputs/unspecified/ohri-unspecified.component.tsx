import { Checkbox } from 'carbon-components-react';
import React, { useCallback, useState } from 'react';
import { boolean } from 'yup';
import { OHRIFormField, RequiredType } from '../../../types';
import styles from '../_input.scss';

export const OHRIUnspecified: React.FC<{ question: OHRIFormField }> = ({ question }) => {
  const [checked, setChecked] = useState();

  const handleOnChange = useCallback(e => {
    setChecked(checked);
  }, []);
  return (
    <div className={styles.unspecified}>
      <Checkbox
        id={`${question.id}-unspcified`}
        labelText="Unspecified"
        value="Unspecified"
        onChange={handleOnChange}
      />
    </div>
  );
};

export function canBeUnspecifiable(question: OHRIFormField): boolean {
  // return question.questionOptions.required?.toLowerCase() == RequiredType.YES_WITH_UNSPECIFIED.toLowerCase();
  // For now return `true` by default until the form json defition is updated
  // TODO: Remove this
  return true;
}
