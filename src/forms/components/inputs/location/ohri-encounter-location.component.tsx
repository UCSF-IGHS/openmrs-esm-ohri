import React, { useEffect, useState } from 'react';
import { Dropdown } from 'carbon-components-react';
import { OHRIFormField } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { getLocationsByTag } from '../../../ohri-form.resource';
import { createErrorHandler } from '@openmrs/esm-framework';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueDisplay, OHRIValueEmpty } from '../../value/ohri-value.component';

export const OHRIEncounterLocationPicker: React.FC<{ question: OHRIFormField; onChange: any }> = ({ question }) => {
  const [field, meta] = useField(question.id);
  const { setEncounterLocation, setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (question.questionOptions.locationTag) {
      getLocationsByTag(
        question.questionOptions.locationTag
          .trim()
          .split(' ')
          .join('%20'),
      ).subscribe(
        results => setLocations(results),
        error => createErrorHandler(),
      );
    }
  }, []);

  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? <OHRIValueDisplay value={field.value.display} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    <div className={styles.formInputField}>
      <Dropdown
        id={question.id}
        titleText={question.label}
        label="Choose location"
        items={locations}
        itemToString={item => item.display}
        selectedItem={field.value}
        onChange={({ selectedItem }) => {
          setFieldValue(question.id, selectedItem);
          setEncounterLocation(selectedItem);
        }}
      />
    </div>
  );
};
