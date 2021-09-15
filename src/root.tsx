import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OHRIHome from './ohri-home/ohri-home-component';
import FormRenderTest from './forms/form-render/form-render-test.component';
import CovidHome from './covid/home/covid-home-component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/ohri-home" render={props => <OHRIHome programme="hts" dashboardTitle="HTS Home Page" />} />
      <Route exact path="/ohri-ct-home" render={props => <OHRIHome programme="ct" dashboardTitle="C&T Home Page" />} />
      <Route exact path="/form-render-test" render={props => <FormRenderTest />} />
    </BrowserRouter>
  );
}
