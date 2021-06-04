import React, { useEffect, useState } from 'react';
import { Button, ButtonSet } from 'carbon-components-react';
import styles from './_form.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { OHRIFormContext } from './ohri-form-context';
import { openmrsObservableFetch, useCurrentPatient, useSessionUser } from '@openmrs/esm-framework';
import { getFieldComponent, getHandler } from './registry/registry';
import { saveEncounter } from './ohri-form.resource';
import { PatientBanner } from '../components/patient-banner/patient-banner.component';
import LoadingIcon from '../components/loading/loading.component';
import { htsEncounterRepresentation } from '../hts/encounters-list/hts-overview-list.component';
import { OHRIFormSchema, OHRIFormField } from './types';
import { HTSEncounterType } from './constants';

interface OHRIFormProps {
  formJson: OHRIFormSchema;
  onSubmit?: any;
  onCancel?: any;
  encounterUuid?: string;
}

const OHRIForm: React.FC<OHRIFormProps> = ({ formJson, encounterUuid, onSubmit, onCancel }) => {
  const [fields, setFields] = useState<Array<OHRIFormField>>([]);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [location, setEncounterLocation] = useState(null);
  const [, patient] = useCurrentPatient();
  const session = useSessionUser();
  const [initialValues, setInitialValues] = useState({});
  const encDate = new Date();
  const [encounter, setEncounter] = useState(null);

  useEffect(() => {
    const form = JSON.parse(JSON.stringify(formJson));
    const allFormFields: Array<OHRIFormField> = [];
    const tempInitVals = {};
    form.pages.forEach(page => page.sections.forEach(section => allFormFields.push(...section.questions)));
    // set Formik initial values
    if (encounter) {
      allFormFields.forEach(
        field => (tempInitVals[field.id] = getHandler(field.type)?.getInitialValue(encounter, field) || ''),
      );
      setEncounterLocation(encounter.location);
    } else {
      allFormFields.forEach(field => {
        if (field.questionOptions.rendering == 'multicheckbox') {
          tempInitVals[field.id] = [];
        } else {
          tempInitVals[field.id] = '';
        }
      });
    }
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
    setInitialValues(tempInitVals);
  }, [encounter]);

  useEffect(() => {
    if (session) {
      if (!encounterUuid) {
        setEncounterLocation(session.sessionLocation);
      }
      setCurrentProvider(session.currentProvider.uuid);
    }
  }, [session]);

  useEffect(() => {
    let subscription;
    if (encounterUuid) {
      subscription = openmrsObservableFetch(
        `/ws/rest/v1/encounter/${encounterUuid}?v=${htsEncounterRepresentation}`,
      ).subscribe(response => {
        setEncounter(response.data);
      });
    }
    return () => subscription?.unsubscribe();
  }, [encounterUuid]);

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
    const obsForSubmission = [];
    // collect observations
    fields
      .filter(field => !field.isHidden && field.type == 'obs' && field.value)
      .forEach(field => {
        if (Array.isArray(field.value)) {
          obsForSubmission.push(...field.value);
        } else {
          obsForSubmission.push(field.value);
        }
      });

    let encounterForSubmission = {};
    if (encounter) {
      Object.assign(encounterForSubmission, encounter);
      encounterForSubmission['location'] = location.uuid;
      // update encounter providers
      const hasCurrentProvider =
        encounterForSubmission['encounterProviders'].findIndex(
          encProvider => encProvider.provider.uuid == currentProvider,
        ) !== -1;
      if (!hasCurrentProvider) {
        encounterForSubmission['encounterProviders'] = [
          ...encounterForSubmission['encounterProviders'],
          {
            provider: currentProvider,
            encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
          },
        ];
      }
      encounterForSubmission['obs'] = obsForSubmission;
    } else {
      encounterForSubmission = {
        patient: patient.id,
        encounterDatetime: encDate,
        location: location.uuid,
        encounterType: formJson.encounterType || HTSEncounterType,
        encounterProviders: [
          {
            provider: currentProvider,
            encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
          },
        ],
        obs: obsForSubmission,
      };
    }
    const ac = new AbortController();
    saveEncounter(ac, encounterForSubmission, encounterUuid).then(response => {
      if (response.ok) {
        if (onSubmit) {
          onSubmit();
        }
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
        enableReinitialize
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
                setEncounterLocation: setEncounterLocation,
                fields: fields,
                encounterContext: {
                  patient: patient,
                  encounter: encounter,
                  location: location,
                  sessionMode: encounterUuid ? 'edit' : 'enter',
                  date: encDate,
                },
              }}>
              {!patient ? (
                <LoadingIcon />
              ) : (
                <>
                  <PatientBanner patient={patient} />
                  <div className={styles.contentWrapper}>
                    {fields.map((question, index) => {
                      const component = getFieldComponent(question.questionOptions.rendering);
                      if (component) {
                        return React.createElement(component, {
                          question: question,
                          onChange: onFieldChange,
                          key: index,
                          handler: getHandler(question.type),
                        });
                      }
                    })}
                  </div>
                </>
              )}
            </OHRIFormContext.Provider>
            <div className={styles.submit}>
              <ButtonSet>
                <Button kind="secondary" onClick={() => (onCancel ? onCancel() : null)}>
                  Cancel
                </Button>
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
