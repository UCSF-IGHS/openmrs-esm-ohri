import React, { useEffect, useState } from 'react';
import { Button, ButtonSet } from 'carbon-components-react';
import styles from './_form.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { OHRIFormContext } from './ohri-form-context';
import { openmrsObservableFetch, useCurrentPatient, useSessionUser } from '@openmrs/esm-framework';
import { getFieldComponent } from './registry/registry';
import { saveEncounter } from './ohri-form.resource';
import { OhriForm } from './types';
import { PatientBanner } from '../components/patient-banner/patient-banner.component';
import LoadingIcon from '../components/loading/loading.component';

// fallback encounter type
const HTSEncounterType = '30b849bd-c4f4-4254-a033-fe9cf01001d8';

const OHRIForm: React.FC<{ formJson: OhriForm }> = ({ formJson }) => {
  const [fields, setFields] = useState([]);
  const [currentProvider, setCurrentProvider] = useState();
  const [location, setLocation] = useState(null);
  const [, patient] = useCurrentPatient();
  const session = useSessionUser();
  const initialValues = {};
  const encDate = new Date();

  useEffect(() => {
    const allFormFields = [];
    formJson.pages.forEach(page => page.sections.forEach(section => allFormFields.push(...section.questions)));
    // set Formik initial values
    allFormFields.forEach(field => (initialValues[field.id] = ''));
    // prepare fields
    setFields(
      allFormFields.map(field => {
        if (field.hide) {
          evaluateHideExpression(field, null, allFormFields);
        } else {
          field.isHidden = false;
        }
        return field;
      }),
    );

    const sub = openmrsObservableFetch('/ws/rest/v1/appui/session').subscribe((user: any) => {
      setCurrentProvider(user.data?.currentProvider?.uuid);
    });

    return () => {
      sub.unsubscribe();
    };
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
    const enc = {
      patient: patient.id,
      encounterDatetime: encDate,
      location: location.uuid,
      encounterType: HTSEncounterType,
      encounterProviders: [
        {
          provider: currentProvider,
          encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
        },
      ],
      obs: fields.filter(field => !field.isHidden && field['obs']).map(field => field['obs']),
    };
    const ac = new AbortController();
    saveEncounter(ac, enc, null).then(response => {
      if (response.ok) {
        // TODO: handle routing
      }
    });
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
                  date: encDate,
                },
              }}>
              {!patient ? (
                <LoadingIcon />
              ) : (
                <>
                  <PatientBanner patient={patient} />
                  <div className={styles.contentWrapper}>
                    {fields.map((question, index) =>
                      React.createElement(getFieldComponent(question.questionOptions.rendering), {
                        question: question,
                        onChange: onFieldChange,
                        key: index,
                      }),
                    )}
                  </div>
                </>
              )}
            </OHRIFormContext.Provider>
            <div className={styles.submit}>
              <ButtonSet>
                <Button kind="secondary">Cancel</Button>
                <Button kind="primary" type="submit">
                  Save
                </Button>
              </ButtonSet>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OHRIForm;
