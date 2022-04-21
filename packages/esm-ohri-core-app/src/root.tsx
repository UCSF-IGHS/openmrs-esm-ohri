import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import OHRIDashboard from './ohri-dashboard/ohri-dashboard.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Route path="/dashboard/:view?" render={props => <OHRIDashboard match={props.match} />} />
    </BrowserRouter>
  );
}
