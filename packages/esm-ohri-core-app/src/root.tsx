import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OHRIHome from './ohri-home/ohri-home-component';

export default function Root () {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route
        exact
        path='/ohri-covid-home'
        render={props => <OHRIHome programme='covid' dashboardTitle='COVID-19 Home Page' />}
      />
      <Route exact path='/ohri-ct-home' render={props => <OHRIHome programme='ct' dashboardTitle='C&T Home Page' />} />
      <Route
        exact
        path='/ohri-hiv-home'
        render={props => <OHRIHome programme='hts' dashboardTitle='HIV-HTS Home Page' />}
      />
    </BrowserRouter>
  );
}
