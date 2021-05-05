import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OhriForm from './forms/OHRIForm';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route exact path="/ohri-forms/" component={OhriForm} />
    </BrowserRouter>
  );
}
