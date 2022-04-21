import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FormRenderTest from './forms/form-render/form-render-test.component';
import OHRIDashboard from './ohri-dashboard/ohri-dashboard.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/form-render-test" render={props => <FormRenderTest />} />
      <Route path="/dashboard/:view?" render={props => <OHRIDashboard match={props.match} />} />
    </BrowserRouter>
  );
}
