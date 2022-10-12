import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OHRIDashboard from './ohri-dashboard/ohri-dashboard.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Routes>
        <Route path="/dashboard" element={<OHRIDashboard />} />
        <Route path="/dashboard/:view" element={<OHRIDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
