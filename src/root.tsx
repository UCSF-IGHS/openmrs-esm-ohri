import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OhriForm from './forms/ohri-form.component';
import HTSRestroForm from './forms/test-forms/hts_retrospective_form-schema';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/ohri-forms/*" render={props => <OhriForm formJson={HTSRestroForm} {...props} />} />
    </BrowserRouter>
  );
}
