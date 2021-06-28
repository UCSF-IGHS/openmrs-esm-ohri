import React, { useEffect, useState } from 'react';
import { Button, Column, Grid, Row } from 'carbon-components-react';
import styles from './_form.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { OHRIFormContext } from './ohri-form-context';
import { openmrsObservableFetch, useCurrentPatient, useSessionUser } from '@openmrs/esm-framework';
import { getHandler } from './registry/registry';
import { saveEncounter } from './ohri-form.resource';
import { PatientBanner } from '../components/patient-banner/patient-banner.component';
import LoadingIcon from '../components/loading/loading.component';
import { htsEncounterRepresentation } from '../hts/encounters-list/hts-overview-list.component';
import { OHRIFormSchema, OHRIFormField, SessionMode } from './types';
import OHRIFormSidebar from './components/sidebar/ohri-form-sidebar.component';
import OHRIFormPage from './components/page/ohri-form-page';
import { HTSEncounterType } from './constants';
interface OHRIFormProps {
  formJson: OHRIFormSchema;
  onSubmit?: any;
  onCancel?: any;
  encounterUuid?: string;
  mode?: SessionMode;
}

const OHRIForm: React.FC<OHRIFormProps> = ({ formJson, encounterUuid, mode, onSubmit, onCancel }) => {
  const [fields, setFields] = useState<Array<OHRIFormField>>([]);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [location, setEncounterLocation] = useState(null);
  const [, patient] = useCurrentPatient();
  const session = useSessionUser();
  const [initialValues, setInitialValues] = useState({});
  const encDate = new Date();
  const [encounter, setEncounter] = useState(null);
  const [form, setForm] = useState<OHRIFormSchema>(null);
  const [currentPage, setCurrentPage] = useState(undefined);

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
        if (field.questionOptions.rendering == 'checkbox') {
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
    setForm(form);
    setInitialValues(tempInitVals);
    setCurrentPage(form?.pages);
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
    // TODO: Handle advanced skip patterns
    if (typeof field.hide !== 'string') {
      field.isHidden = false;
      return;
    }
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
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({})}
        onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit(values);
          setSubmitting(false);
        }}>
        {props => (
          <Form className={styles.formStyle}>
            {!patient ? (
              <LoadingIcon />
            ) : (
              <>
                <PatientBanner patient={patient} />
                <Grid>
                  <Row className={styles.ohriformcontainer}>
                    <Column lg={2} md={2} sm={1}>
                      <div className={styles.ohriSidebar}>
                        <OHRIFormSidebar currentPage={currentPage} />
                        <hr className={styles.sideBarHorizontalLine} />
                        {mode != 'view' && (
                          <Button
                            style={{ marginBottom: '0.625rem', width: '11.688rem', display: 'block' }}
                            type="submit">
                            Save
                          </Button>
                        )}
                        <Button
                          style={{ width: '11.688rem' }}
                          kind="tertiary"
                          onClick={() => (onCancel ? onCancel() : null)}>
                          {mode == 'view' ? 'Close' : 'Cancel'}
                        </Button>
                      </div>
                    </Column>
                    <Column lg={10} md={6} className={styles.ohriFormContent}>
                      <div>
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
                              sessionMode: mode || (encounterUuid ? 'edit' : 'enter'),
                              date: encDate,
                            },
                          }}>
                          <div className={styles.contentWrapper}>
                            <h4 className={styles.title}>{form.name}</h4>
                            {form.pages.map((page, index) => {
                              return <OHRIFormPage page={page} onFieldChange={onFieldChange} />;
                            })}
                          </div>
                        </OHRIFormContext.Provider>
                      </div>
                    </Column>
                  </Row>
                </Grid>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OHRIForm;
