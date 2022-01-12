import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FormRenderTest from './forms/form-render/form-render-test.component';

export default function Root () {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path='/form-render-test' render={props => <FormRenderTest />} />
    </BrowserRouter>
  );
}
