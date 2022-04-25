import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FormRenderTest from './render/forms-render-test.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/form-render-test" render={props => <FormRenderTest />} />
    </BrowserRouter>
  );
}
