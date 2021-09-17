import { ButtonSet } from 'carbon-components-react';
import Button from 'carbon-components-react/lib/components/Button';
import Row from 'carbon-components-react/lib/components/Grid/Row';
import { useFormikContext } from 'formik';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ConceptTrue } from '../../constants';
import { OHRIFormContext } from '../../ohri-form-context';
import { getConcept } from '../../ohri-form.resource';
import { getHandler } from '../../registry/registry';
import { OHRIFormField, OHRIFormFieldProps } from '../../types';
import { OHRIObsGroup } from '../group/ohri-obs-group.component';

export const getInitialValueFromObs = (field: OHRIFormField, obsGroup: any) => {
  const rendering = field.questionOptions.rendering;
  const obs = obsGroup.groupMembers.filter(o => o.concept.uuid == field.questionOptions.concept);
  if (obs.length) {
    field.value = obs[0];
    if (rendering == 'radio' || rendering == 'content-switcher') {
      getConcept(field.questionOptions.concept, 'custom:(uuid,display,datatype:(uuid,display,name))').subscribe(
        result => {
          if (result.datatype.name == 'Boolean') {
            field.value.value = obs[0].value.uuid;
          }
        },
      );
    }
    if (typeof obs[0].value == 'string' || typeof obs[0].value == 'number') {
      return field.questionOptions.rendering == 'date' ? moment(obs[0].value).toDate() : obs[0].value;
    }
    if (field.questionOptions.rendering == 'checkbox') {
      field.value = obs;
      return field.value.map(o => o.value.uuid);
    }
    if (field.questionOptions.rendering == 'toggle') {
      field.value.value = obs[0].value.uuid;
      return obs[0].value == ConceptTrue;
    }
    return obs[0].value?.uuid;
  }
  return '';
};

let counter = 0;

export const OHRIRepeat: React.FC<OHRIFormFieldProps> = ({ question, onChange }) => {
  const [questions, setQuestions] = useState([question]);
  const { fields, encounterContext } = React.useContext(OHRIFormContext);
  const { values, setValues } = useFormikContext();

  useEffect(() => {
    if (encounterContext.encounter && !counter) {
      const alreadyMappedGroup = question.value?.uuid;
      const unMappedObsGroups = encounterContext.encounter.obs.filter(
        obs => obs.concept.uuid === question.questionOptions.concept && obs.uuid != alreadyMappedGroup,
      );
      // create new fields and map them values
      unMappedObsGroups.forEach(obsGroup => {
        handleAdd(obsGroup);
      });
    }
  }, [values]);

  const handleAdd = (obsGroup?: any) => {
    const idSuffix = ++counter;
    const next = cloneDeep(question);
    next.value = obsGroup;
    next.id = `${next.id}-${idSuffix}`;
    next.questions.forEach(q => {
      q.id = `${q.id}-${idSuffix}`;
      q['groupId'] = next.id;
      q.value = null;
      let initialValue = obsGroup ? getInitialValueFromObs(q, obsGroup) : null;
      values[`${q.id}`] = initialValue ? initialValue : q.questionOptions.rendering == 'checkbox' ? [] : '';
      fields.push(q);
    });
    setValues(values);
    fields.push(next);
    questions.push(next);
    setQuestions(questions);
  };

  const removeQuestion = (question: OHRIFormField) => {
    setQuestions(questions.filter(q => q.id !== question.id));
    // cleanup
    const dueFields = [question.id, ...question.questions.map(q => q.id)];
    dueFields.forEach(field => {
      const index = fields.findIndex(f => f.id === field);
      fields.splice(index, 1);
      delete values[field];
    });
  };
  const Nodes = questions.map((question, index) => {
    return (
      <Row style={{ margin: '0', marginBottom: '1rem' }}>
        <OHRIObsGroup question={question} onChange={onChange} handler={getHandler('obsGroup')} />
        <div>
          <ButtonSet>
            <Button onClick={() => handleAdd(null)}>Add</Button>{' '}
            {index !== 0 && (
              <Button kind="danger" onClick={() => removeQuestion(question)}>
                Remove
              </Button>
            )}
          </ButtonSet>
        </div>
      </Row>
    );
  });
  return <>{Nodes}</>;
};
