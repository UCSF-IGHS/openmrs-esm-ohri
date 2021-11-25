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
import { isTrue } from '../../../utils/boolean-utils';
import { fetchConceptNameAndUUID } from '../../../../api/api';

export const OHRIEncounterLocationPicker: React.FC<{ question: OHRIFormField; onChange: any }> = ({ question }) => {
  const [field, meta] = useField(question.id);
  const { setEncounterLocation, setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [locations, setLocations] = useState([]);
  const [conceptName, setConceptName] = useState('Loading...');

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

  useEffect(() => {
    fetchConceptNameAndUUID(question.questionOptions.concept).then(({ data }) => {
      if (data.results.length) {
        const concept = data.results[data.results.length - 1];
        setConceptName(`Concept Name: ${concept.display} \n UUID: ${concept.uuid}`);
      }
    });
  }, [conceptName]);

  return encounterContext.sessionMode == 'view' || isTrue(question.readonly) ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} tooltipText={conceptName} />
      {field.value ? <OHRIValueDisplay value={field.value.display} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    !question.isHidden && (
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
          disabled={question.disabled}
        />
      </div>
    )
  );
};
