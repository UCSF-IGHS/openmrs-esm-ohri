import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import OHRIDashboard from './ohri-dashboard/ohri-dashboard.component';
import HomeDashboard from './dashboard/home.component';
import { setLeftNav, unsetLeftNav } from '@openmrs/esm-framework';

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;

  useEffect(() => {
    setLeftNav({ name: 'ohri-dashboard-slot', basePath: spaBasePath });
    return () => unsetLeftNav('ohri-dashboard-slot');
  }, [spaBasePath]);

  return (
    <BrowserRouter basename={window.spaBase}>
      <main className="omrs-main-content">
        <Routes>
          <Route path="/dashboard" element={<HomeDashboard />} />
          <Route path="/dashboard/:view" element={<HomeDashboard />} />
          <Route path="/home" element={<Navigate to={'/dashboard/home'} replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
