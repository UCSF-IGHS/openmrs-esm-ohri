import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OhriForm from './forms/ohri-form.component';
import POCVitalsForm from './forms/test-forms/test-form_1';
import Home from './home/components/home.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/ohri-forms/*" render={props => <OhriForm formJson={POCVitalsForm} {...props} />} />
      <Route exact path="/patients/hts/form" render={() => <Home />} />
    </BrowserRouter>
  );
}
