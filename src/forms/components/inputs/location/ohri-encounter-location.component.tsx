import React, { useEffect, useState } from 'react';
import { Dropdown } from 'carbon-components-react';
import { OhriFormField } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { getLocationsByTag } from '../../../ohri-form.resource';
import { createErrorHandler } from '@openmrs/esm-framework';

export const OHRIEncounterLocationPicker: React.FC<{ question: OhriFormField; onChange: any }> = ({ question }) => {
  const [field, meta] = useField(question.id);
  const { setEncounterLocation } = React.useContext(OHRIFormContext);
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

  return (
    <div className={styles.formInputField}>
      <Dropdown
        id={question.id}
        titleText={question.label}
        label="Choose location"
        items={locations}
        itemToString={item => item.display}
        selectedItem={field.value}
        onChange={({ selectedItem }) => {
          setEncounterLocation(selectedItem);
        }}
      />
    </div>
  );
};
