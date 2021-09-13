import { ButtonSet } from 'carbon-components-react';
import Button from 'carbon-components-react/lib/components/Button';
import Column from 'carbon-components-react/lib/components/Grid/Column';
import Row from 'carbon-components-react/lib/components/Grid/Row';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { OHRIFormContext } from '../../ohri-form-context';
import { getHandler } from '../../registry/registry';
import { OHRIFormField, OHRIFormFieldProps } from '../../types';
import { OHRIObsGroup } from '../group/ohri-obs-group.component';

export const OHRIRepeat: React.FC<OHRIFormFieldProps> = ({ question, onChange }) => {
  const [questions, setQuestions] = useState([question]);
  const [counter, setCounter] = useState(0);
  const { values, fields } = React.useContext(OHRIFormContext);

  const handleAdd = () => {
    const idSuffix = counter + 1;
    const next = cloneDeep(question);
    next.id = `${next.id}-${idSuffix}`;
    next.questions.forEach(q => {
      q.id = `${q.id}-${idSuffix}`;
      q['groupId'] = next.id;
      values[`${q.id}`] = q.questionOptions.rendering == 'checkbox' ? [] : '';
      fields.push(q);
    });
    fields.push(next);
    setQuestions([...questions, next]);
    setCounter(counter + 1);
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
            <Button onClick={handleAdd}>Add</Button>{' '}
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
