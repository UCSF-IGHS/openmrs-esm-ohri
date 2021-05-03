import React, { useState } from 'react';
import Sample from './sample';
import { Formik, Form } from 'formik';
import OHRITextObs from './components/inputs/ohri-text-obs.component';

function OhriForm() {
  const [fields, setFields] = useState(Sample.pages[0].sections[0].questions);

  // useEffect(() => {}, []);

  const handleFormSubmit = () => {
    return;
  };

  return (
    <Formik initialValues={{}} validationSchema={{}} onSubmit={handleFormSubmit}>
      <Form>
        {fields.map(function(item, i) {
          const type = item.questionOptions.rendering;
          if (type == 'number') {
            return <OHRITextObs id={item.id} label={item.label} />;
          }
        })}
      </Form>
    </Formik>
  );
}

export default OhriForm;
