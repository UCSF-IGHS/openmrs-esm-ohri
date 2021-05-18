import React, { useEffect, useState } from 'react';
import Sample from './sample';
import OHRITextObs from './components/inputs/text/ohri-text-obs.component';
import OHRIRadioObs from './components/inputs/radio/ohri-radio-obs.component';
import OHRIDateObs from './components/inputs/date/ohri-date-obs.component';
import { Button, ButtonSet } from 'carbon-components-react';
import styles from './_form.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { OHRIFormContext } from './ohri-form-context';
import { useCurrentPatient, useSessionUser } from '@openmrs/esm-framework';

function OHRIForm() {
  const [fields, setFields] = useState([]);
  const [location, setLocation] = useState();
  const [, patient] = useCurrentPatient();
  const session = useSessionUser();
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

  useEffect(() => {
    if (session) {
      setLocation(session.sessionLocation);
    }
  }, [session]);

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

  const handleFormSubmit = (values: Record<string, any>) => {
    const observations = fields.filter(field => !field.isHidden).map(field => field['obs']);
    console.log(observations);
  };

  const onFieldChange = (fieldName: string, value: any) => {
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
  console.log(fields);
  return (
    <div className={styles.ohriformcontainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({})}
        onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit(values);
          setSubmitting(false);
        }}>
        {props => (
          <Form>
            <OHRIFormContext.Provider
              value={{
                values: props.values,
                setFieldValue: props.setFieldValue,
                encounterContext: {
                  patient: patient,
                  encounter: null,
                  location: location,
                  sessionMode: 'enter',
                  date: new Date(),
                },
              }}>
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
            </OHRIFormContext.Provider>
            <ButtonSet>
              <Button kind="secondary">Cancel</Button>
              <Button kind="primary" type="submit">
                Save
              </Button>
            </ButtonSet>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default OHRIForm;
