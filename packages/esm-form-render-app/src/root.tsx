import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FormRenderComponent from './render/forms-render-test.component';
import FormRenderTest from './render/forms-render-test.component';

export default function Root () {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path='/form-render-test' component={FormRenderTest} />
      <Route path='/forms/:packageName/:formName/:patientUUID' component={FormRenderComponent} />
    </BrowserRouter>
  );
}
