import React, { useEffect, useState } from 'react';
import Sample from './sample';
import OHRITextObs from './components/inputs/OHRI-text-obs.component';
import OHRIRadioObs from './components/inputs/OHRI-radio-obs.component';
import OHRIDateObs from './components/inputs/OHRI-date-obs.component';
import { Button, ButtonSet } from 'carbon-components-react';
import styles from './_form.scss';
import { Form, Formik } from 'formik';

function OHRIForm() {
  const [fields, setFields] = useState(Sample.pages[0].sections[0].questions);

  const initialValues = {};

  useEffect(() => {
    fields.forEach(field => (initialValues[field.id] = ''));
  }, [fields]);

  const handleFormSubmit = () => {
    return;
  };

  return (
    <div className={styles.ohriformcontainer}>
      <Formik initialValues={initialValues} validationSchema={{}} onSubmit={handleFormSubmit}>
        {props => (
          <Form>
            {console.log(props.values)}

            {fields.map(function(question, q) {
              const type = question.questionOptions.rendering;
              if (type == 'number') {
                return <OHRITextObs questions={question} />;
              } else if (type == 'radio') {
                return <OHRIRadioObs questions={question} />;
              } else if (type == 'date') {
                return <OHRIDateObs questions={question} />;
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
