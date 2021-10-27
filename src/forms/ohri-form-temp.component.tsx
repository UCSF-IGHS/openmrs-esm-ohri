import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

const OHRIFormTemp = () => {
  const initialValues = {};

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object({})}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}>
      <Form style={{ height: '100%' }}></Form>
    </Formik>
  );
};

export default OHRIFormTemp;
