import React from 'react';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueDisplay, OHRIValueEmpty } from '../../value/ohri-value.component';
import styles from '../_input.scss';

const OHRIFixedValue: React.FC<OHRIFormFieldProps> = ({ question }) =>
  !question.isHidden && (
    <div className={styles.formFields}>
      <OHRILabel value={question.label} />
      {question.value ? <OHRIValueDisplay value={question.value} /> : <OHRIValueEmpty />}
    </div>
  );

export default OHRIFixedValue;
