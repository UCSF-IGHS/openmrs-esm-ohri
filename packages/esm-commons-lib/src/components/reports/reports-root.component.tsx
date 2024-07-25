import React from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportComponent from './reports-home.component';

const swrConfiguration = {
  errorRetryCount: 3,
};

const RootComponent: React.FC = () => {
  const reportsBasename = window.getOpenmrsSpaBase() + 'home/reports';

  return (
    <main>
      <SWRConfig value={swrConfiguration}>
        <BrowserRouter basename={reportsBasename}>
          <Routes>
            <Route path="/" element={<ReportComponent />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </main>
  );
};

export default RootComponent;
