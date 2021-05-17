import React, { useEffect, useState } from 'react';
import Sample from './sample';
import OHRITextObs from './components/inputs/ohri-text-obs.component';
import OHRIRadioObs from './components/inputs/ohri-radio-obs.component';
import OHRIDateObs from './components/inputs/ohri-date-obs.component';
import { Button, ButtonSet } from 'carbon-components-react';
import styles from './_form.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

function OHRIForm() {
  const [fields, setFields] = useState([]);
  const initialValues = {};

  useEffect(() => {
    const rawFormFields = Sample.pages[0].sections[0].questions;
    rawFormFields.forEach(field => (initialValues[field.id] = ''));
    setFields(
      rawFormFields.map(field => {
        if (field.hide) {
          evaluateHideExpression(field, null, rawFormFields);
        } else {
          field.isHidden = false;
        }
        return field;
      }),
    );
  }, []);

  const evaluateHideExpression = (field, determinantValue, allFields) => {
    const allFieldsKeys = allFields.map(f => f.id);
    const parts = field.hide.trim().split(' ');
    const determinantField = parts[0];
    if (allFieldsKeys.includes(determinantField)) {
      field['hideDeterminant'] = determinantField;
      const determinant = allFields.find(field => field.id === determinantField);
      determinant['dependant'] = field.id;
      let hideExp = field.hide;
      // prep eval variables
      determinantValue = determinantValue || initialValues[determinantField];
      const expectedValue = parts[2];
      hideExp = hideExp.replace(determinantField, 'determinantValue');
      hideExp = hideExp.replace(expectedValue, 'expectedValue');
      field.isHidden = eval(hideExp);
    } else {
      field.isHidden = false;
    }
  };

  const handleFormSubmit = () => {
    return;
  };

  const onFieldChange = (fieldName, value) => {
    const field = fields.find(field => field.id == fieldName);
    if (field.dependant) {
      const dependant = fields.find(f => f.hideDeterminant == fieldName);
      evaluateHideExpression(dependant, value, fields);
      let fields_temp = [...fields];
      const index = fields_temp.findIndex(f => f.id == field.dependant);
      fields_temp[index] = dependant;
      setFields(fields_temp);
    }
  };

  return (
    <div className={styles.ohriformcontainer}>
      <Formik initialValues={initialValues} validationSchema={Yup.object({})} onSubmit={handleFormSubmit}>
        {props => (
          <Form>
            {fields.map((question, index) => {
              const type = question.questionOptions.rendering;
              if (type == 'number') {
                return <OHRITextObs question={question} onChange={onFieldChange} key={index} />;
              } else if (type == 'radio') {
                return (
                  <OHRIRadioObs
                    question={question}
                    onChange={onFieldChange}
                    key={index}
                    setFieldValue={props.setFieldValue}
                  />
                );
              } else if (type == 'date') {
                return (
                  <OHRIDateObs
                    question={question}
                    onChange={onFieldChange}
                    key={index}
                    setFieldValue={props.setFieldValue}
                  />
                );
              }
            })}
            <ButtonSet>
              <Button kind="secondary">Cancel</Button>
              <Button kind="primary">Save</Button>
            </ButtonSet>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default OHRIForm;
