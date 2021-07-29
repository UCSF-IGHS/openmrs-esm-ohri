import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OhriNewForm from './ohri-form/ohri-new-form.component';
import OhriHome from './ohri-home/ohri-home-component';
import OhriNewForm from './ohri-form/ohri-new-form.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/ohri-home" render={props => <OhriHome />} />
      <Route exact path="/form-test" render={props => <OhriNewForm />} />
    </BrowserRouter>
  );
}
