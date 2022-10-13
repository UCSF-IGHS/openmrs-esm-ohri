import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import OHRIDashboard from './ohri-dashboard/ohri-dashboard.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Routes>
        <Route path="/dashboard" element={<OHRIDashboard />} />
        <Route path="/dashboard/:view" element={<OHRIDashboard />} />
        <Route path="/home" element={<Navigate to={'/dashboard/home'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
