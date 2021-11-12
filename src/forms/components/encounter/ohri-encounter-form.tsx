import { openmrsObservableFetch } from '@openmrs/esm-framework';
import React, { useCallback, useEffect, useState } from 'react';
import { encounterRepresentation } from '../../../constants';
import { ConceptFalse, ConceptTrue } from '../../constants';
import { OHRIFormContext } from '../../ohri-form-context';
import { saveEncounter } from '../../ohri-form.resource';
import { getHandler } from '../../registry/registry';
import {
  EncounterDescriptor,
  OHRIFormField,
  OHRIFormPage as OHRIFormPageProps,
  OHRIFormSchema,
  SessionMode,
} from '../../types';
import { cascadeVisibityToChildFields } from '../../utils/ohri-form-helper';
import { isEmpty as isValueEmpty, OHRIFieldValidator } from '../../validators/ohri-form-validator';
import OHRIFormPage from '../page/ohri-form-page';
import { InstantEffect } from '../../utils/instant-effect';
import { FormSubmissionHandler } from '../../ohri-form.component';
import ReactMarkdown from 'react-markdown';
import { isTrue } from '../../utils/boolean-utils';

interface OHRIEncounterFormProps {
  formJson: OHRIFormSchema;
  patient: any;
  encounterDate: Date;
  provider: string;
  location: { uuid: string; name: string };
  values: Record<string, any>;
  isCollapsed: boolean;
  sessionMode: SessionMode;
  scrollablePages: Set<OHRIFormPageProps>;
  handlers: Map<string, FormSubmissionHandler>;
  allInitialValues: Record<string, any>;
  setAllInitialValues: (values: Record<string, any>) => void;
  setScrollablePages: (pages: Set<OHRIFormPageProps>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setSelectedPage: (page: string) => void;
}

export const OHRIEncounterForm: React.FC<OHRIEncounterFormProps> = ({
  formJson,
  patient,
  encounterDate,
  provider,
  location,
  values,
  isCollapsed,
  sessionMode,
  scrollablePages,
  setScrollablePages,
  setFieldValue,
  setSelectedPage,
  handlers,
  allInitialValues,
  setAllInitialValues,
}) => {
  const [fields, setFields] = useState<Array<OHRIFormField>>([]);
  const [encounterLocation, setEncounterLocation] = useState(null);
  const [encounter, setEncounter] = useState<EncounterDescriptor>(null);
  const [form, setForm] = useState<OHRIFormSchema>(formJson);
  const [obsGroupsToVoid, setObsGroupsToVoid] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({});

  const addScrollablePages = useCallback(() => {
    formJson.pages.forEach(page => {
      if (!page.isSubform) {
        scrollablePages.add(page);
      }
    });
    return () => {
      formJson.pages.forEach(page => {
        if (!page.isSubform) {
          scrollablePages.delete(page);
        }
      });
    };
  }, [scrollablePages, formJson]);

  useEffect(() => {
    if (!encounterLocation) {
      setEncounterLocation(location);
    }
  }, [location]);

  useEffect(() => {
    const allFormFields: Array<OHRIFormField> = [];
    const tempInitVals = {};
    form.pages.forEach(page =>
      page.sections.forEach(section => {
        section.questions.forEach(question => {
          allFormFields.push(question);
          if (question.type == 'obsGroup') {
            question.questions.forEach(groupedField => {
              // set group id
              groupedField['groupId'] = question.id;
              allFormFields.push(groupedField);
            });
          }
        });
      }),
    );
    // set Formik initial values
    if (encounter) {
      allFormFields.forEach(field => {
        const existingVal = getHandler(field.type)?.getInitialValue(encounter, field, allFormFields);

        tempInitVals[field.id] = existingVal === null || existingVal === undefined ? '' : existingVal;
        if (field.unspecified) {
          tempInitVals[`${field.id}-unspecified`] = !!!existingVal;
        }
      });
      setEncounterLocation(encounter.location);
    } else {
      allFormFields.forEach(field => {
        if (field.questionOptions.rendering == 'checkbox') {
          tempInitVals[field.id] = [];
        } else if (field.questionOptions.rendering == 'toggle') {
          tempInitVals[field.id] = false;
        } else {
          tempInitVals[field.id] = '';
        }
        if (field.unspecified) {
          tempInitVals[`${field.id}-unspecified`] = false;
        }
      });
    }
    // prepare fields
    setFields(
      allFormFields.map(field => {
        if (field.hide) {
          evaluateHideExpression(field, null, allFormFields, tempInitVals);
        } else {
          field.isHidden = false;
        }

        //evaluate question-level markdown visibility
        if (field.markdown?.hide) {
          field.markdown.isHidden = eval(field.markdown.hide);
        }

        return field;
      }),
    );

    //prepare markdown
    // if (form.markdown && form.markdown.hide) {
    //   form.markdown.isHidden = eval(form.markdown.hide);
    // }

    form.pages.forEach(page => {
      if (page.hide) {
        evaluateHideExpression(null, null, allFormFields, null, page, null);
      } else {
        page.isHidden = false;
      }

      //evaluate page-level markdown visibility
      // if (page.markdown?.hide) {
      //   page.markdown.isHidden = eval(page.markdown.hide);
      // }

      //evaluate section-level markdown visibility
      page.sections.map(section => {
        if (section.markdown?.hide) {
          section.markdown.isHidden = eval(section.markdown.hide);
        }
      });
    });
    setForm(form);
    setFormInitialValues(tempInitVals);
    setAllInitialValues({ ...allInitialValues, ...tempInitVals });
  }, [encounter]);

  useEffect(() => {
    let subscription;
    if (formJson.encounter && typeof formJson.encounter == 'string') {
      subscription = openmrsObservableFetch<EncounterDescriptor>(
        `/ws/rest/v1/encounter/${formJson.encounter}?v=${encounterRepresentation}`,
      ).subscribe(({ data }) => setEncounter(data));
    } else if (typeof formJson.encounter == 'object') {
      setEncounter(formJson.encounter);
    }
    return () => subscription?.unsubscribe();
  }, [formJson.encounter]);

  const evaluateHideExpression = (
    field,
    determinantValue = undefined,
    allFields,
    initialVals?: Record<string, any>,
    page?,
    section?,
  ) => {
    let hideExpression =
      field?.hide?.hideWhenExpression || page?.hide?.hideWhenExpression || section?.hide?.hideWhenExpression;
    const allFieldsKeys = allFields.map(f => f.id);
    const parts = hideExpression.trim().split(' ');

    function isEmpty(value) {
      if (allFieldsKeys.includes(value)) {
        return initialVals ? isValueEmpty(initialVals[value]) : isValueEmpty(formInitialValues[value]);
      }
      return isValueEmpty(value);
    }

    function includes(questionId, value) {
      if (allFieldsKeys.includes(questionId)) {
        const determinant = allFields.find(candidate => candidate.id === questionId);
        if (!determinant.fieldDependants) {
          determinant.fieldDependants = new Set();
        }
        determinant.fieldDependants.add(field.id);
        const initValues = initialVals || formInitialValues;
        const valueArray = determinantValue || initValues[questionId];
        return valueArray?.includes(value);
      }
      return false;
    }

    parts.forEach((part, index) => {
      if (index % 2 == 0) {
        if (allFieldsKeys.includes(part)) {
          const determinant = allFields.find(field => field.id === part);
          if (field) {
            if (!determinant.fieldDependants) {
              determinant.fieldDependants = new Set();
            }
            determinant.fieldDependants.add(field.id);
          }
          if (page) {
            if (!determinant.pageDependants) {
              determinant.pageDependants = new Set();
            }
            determinant.pageDependants.add(page.label);
          }
          if (section) {
            if (!determinant.sectionDependants) {
              determinant.sectionDependants = new Set();
            }
            determinant.sectionDependants.add(section.label);
          }
          // prep eval variables
          if (determinantValue == undefined) {
            determinantValue = initialVals ? initialVals[part] || null : formInitialValues[part] || null;
            if (determinant.questionOptions.rendering == 'toggle') {
              determinantValue = determinantValue ? ConceptTrue : ConceptFalse;
            }
          }
          if (determinantValue && typeof determinantValue == 'string') {
            determinantValue = `'${determinantValue}'`;
          }
          const regx = new RegExp(part, 'g');
          hideExpression = hideExpression.replace(regx, determinantValue);
        }
      }
    });
    try {
      const isHidden = eval(hideExpression);
      if (field) {
        field.isHidden = isHidden;

        //evaluate markdown visibility
        if (field.markdown?.hide) {
          field.markdown.isHidden = eval(field.markdown.hide);
        }
      }
      if (page) {
        page.isHidden = isHidden;

        // evaluate markdown visibility
        if (page.markdown?.hide) {
          page.markdown.isHidden = eval(page.markdown.hide);
        }

        page.sections.forEach(section => {
          section.isParentHidden = isHidden;
          cascadeVisibityToChildFields(isHidden, section, allFields);
        });
      }
      if (section) {
        section.isHidden = isHidden;

        //evaluate markdown visibility
        if (section.markdown?.hide) {
          section.markdown.isHidden = eval(section.markdown.hide);
        }

        cascadeVisibityToChildFields(isHidden, section, allFields);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addObs = useCallback((obsList: Array<any>, obs: any) => {
    if (Array.isArray(obs)) {
      obs.forEach(o => {
        delete o.formFieldNamespace;
        delete o.formFieldPath;
        if (isValueEmpty(o.groupMembers)) {
          delete o.groupMembers;
        } else {
          o.groupMembers.forEach(obsChild => {
            delete obsChild.formFieldNamespace;
            delete obsChild.formFieldPath;
            if (isValueEmpty(obsChild.groupMembers)) {
              delete obsChild.groupMembers;
            }
          });
        }
        obsList.push(o);
      });
    } else {
      delete obs.formFieldNamespace;
      delete obs.formFieldPath;
      if (isValueEmpty(obs.groupMembers)) {
        delete obs.groupMembers;
      } else {
        obs.groupMembers.forEach(obsChild => {
          delete obsChild.formFieldNamespace;
          delete obsChild.formFieldPath;
          if (isValueEmpty(obsChild.groupMembers)) {
            delete obsChild.groupMembers;
          }
        });
      }
      obsList.push(obs);
    }
  }, []);

  const validate = useCallback(
    values => {
      let formHasErrors = false;
      // handle field validation
      fields
        .filter(field => !field.isParentHidden && !field.disabled && !field.isHidden)
        .filter(field => field['submission']?.unspecified != true)
        .forEach(field => {
          const errors = OHRIFieldValidator.validate(field, values[field.id]);
          if (errors.length) {
            field['submission'] = {
              ...field['submission'],
              errors: errors,
            };
            formHasErrors = true;
            return;
          }
        });
      return !formHasErrors;
    },
    [fields],
  );

  const handleFormSubmit = (values: Record<string, any>) => {
    const obsForSubmission = [];
    fields
      .filter(field => field.value || field.type == 'obsGroup') // filter out fields with empty values except groups
      .filter(field => !field.isParentHidden && !field.isHidden && (field.type == 'obs' || field.type == 'obsGroup'))
      .filter(field => !field['groupId']) // filter out grouped obs
      .forEach(field => {
        if (field.type == 'obsGroup') {
          const obsGroup = {
            person: patient.id,
            obsDatetime: encounterDate,
            concept: field.questionOptions.concept,
            location: encounterLocation,
            order: null,
            groupMembers: [],
            uuid: field?.value?.uuid,
            voided: false,
          };
          let hasValue = false;
          field.questions.forEach(groupedField => {
            if (groupedField.value) {
              hasValue = true;
              if (Array.isArray(groupedField.value)) {
                obsGroup.groupMembers.push(...groupedField.value);
              } else {
                obsGroup.groupMembers.push(groupedField.value);
              }
            }
          });
          hasValue && addObs(obsForSubmission, obsGroup);
        } else {
          addObs(obsForSubmission, field.value);
        }
      });

    // Add voided obs groups
    obsGroupsToVoid.forEach(obs => addObs(obsForSubmission, obs));
    let encounterForSubmission: EncounterDescriptor = {};
    if (encounter) {
      Object.assign(encounterForSubmission, encounter);
      encounterForSubmission['location'] = encounterLocation.uuid;
      // update encounter providers
      const hasCurrentProvider =
        encounterForSubmission['encounterProviders'].findIndex(encProvider => encProvider.provider.uuid == provider) !==
        -1;
      if (!hasCurrentProvider) {
        encounterForSubmission['encounterProviders'] = [
          ...encounterForSubmission.encounterProviders,
          {
            provider: provider,
            encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
          },
        ];
      }
      encounterForSubmission['obs'] = obsForSubmission;
    } else {
      encounterForSubmission = {
        patient: patient.id,
        encounterDatetime: encounterDate,
        location: encounterLocation.uuid,
        encounterType: formJson.encounterType,
        encounterProviders: [
          {
            provider: provider,
            encounterRole: '240b26f9-dd88-4172-823d-4a8bfeb7841f',
          },
        ],
        obs: obsForSubmission,
      };
    }
    if (encounterForSubmission.obs?.length || encounterForSubmission.orders?.length) {
      const ac = new AbortController();
      return saveEncounter(ac, encounterForSubmission, encounter?.uuid);
    }
  };

  const onFieldChange = (fieldName: string, value: any) => {
    const field = fields.find(field => field.id == fieldName);
    if (field.questionOptions.rendering == 'toggle') {
      value = value ? ConceptTrue : ConceptFalse;
    }
    if (field.fieldDependants) {
      field.fieldDependants.forEach(dep => {
        const dependant = fields.find(f => f.id == dep);
        evaluateHideExpression(dependant, value, fields);
        let fields_temp = [...fields];
        const index = fields_temp.findIndex(f => f.id == dep);
        fields_temp[index] = dependant;
        setFields(fields_temp);
      });
    }
    if (field.pageDependants) {
      field.pageDependants?.forEach(dep => {
        const dependant = form.pages.find(f => f.label == dep);
        evaluateHideExpression(null, value, fields, null, dependant, null);
        let form_temp = form;
        const index = form_temp.pages.findIndex(page => page.label == dep);
        form_temp[index] = dependant;
        setForm(form_temp);
      });
    }
  };

  // set handler
  handlers.set(form.name, { validate: validate, submit: handleFormSubmit });

  return (
    <OHRIFormContext.Provider
      value={{
        values: values,
        setFieldValue: setFieldValue,
        setEncounterLocation: setEncounterLocation,
        setObsGroupsToVoid: setObsGroupsToVoid,
        obsGroupsToVoid: obsGroupsToVoid,
        fields: fields,
        encounterContext: {
          patient: patient,
          encounter: encounter,
          location: location,
          sessionMode: sessionMode || (form?.encounter ? 'edit' : 'enter'),
          date: encounterDate,
        },
      }}>
      <InstantEffect effect={addScrollablePages} />

      {form.pages.map((page, index) => {
        if (isTrue(page.isHidden)) {
          return null;
        }
        if (isTrue(page.isSubform) && page.subform?.form) {
          if (sessionMode != 'enter' && !page.subform?.form.encounter) {
            return null;
          }
          // filter out all nested subforms
          page.subform.form.pages = page.subform.form.pages.filter(page => !isTrue(page.isSubform));
          return (
            <OHRIEncounterForm
              key={index}
              formJson={page.subform?.form}
              patient={patient}
              encounterDate={encounterDate}
              provider={provider}
              location={location}
              values={values}
              isCollapsed={isCollapsed}
              sessionMode={sessionMode}
              scrollablePages={scrollablePages}
              setAllInitialValues={setAllInitialValues}
              allInitialValues={allInitialValues}
              setScrollablePages={setScrollablePages}
              setFieldValue={setFieldValue}
              setSelectedPage={setSelectedPage}
              handlers={handlers}
            />
          );
        }
        return (
          <OHRIFormPage
            page={page}
            onFieldChange={onFieldChange}
            setSelectedPage={setSelectedPage}
            isCollapsed={isCollapsed}
          />
        );
      })}
    </OHRIFormContext.Provider>
  );
};
