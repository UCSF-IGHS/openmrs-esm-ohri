import { Checkbox } from 'carbon-components-react';
import React, { useCallback, useEffect, useState } from 'react';
import { OHRIFormField, RequiredType } from '../../../types';
import styles from '../_input.scss';

export const OHRIUnspecified: React.FC<{
  question: OHRIFormField;
  handleFieldChange?: (value: any) => void;
  setUnspecified?: (value: boolean) => void;
}> = ({ question, setUnspecified }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      setUnspecified && setUnspecified(true);
    } else {
      setUnspecified && setUnspecified(false);
    }
  }, [checked]);

  useEffect(() => {
    if (question.value) {
      setChecked(false);
    }
  }, [question.value]);

  const handleOnChange = useCallback(value => {
    setChecked(value);
  }, []);

  return (
    <div className={styles.unspecified}>
      <Checkbox
        id={`${question.id}-unspcified`}
        labelText="Unspecified"
        value="Unspecified"
        onChange={handleOnChange}
        checked={checked}
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
