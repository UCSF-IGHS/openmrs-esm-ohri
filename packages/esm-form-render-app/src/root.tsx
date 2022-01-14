import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FormRenderComponent from './render/forms-render.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/form-render-test" component={FormRenderComponent} />
    </BrowserRouter>
  );
}
