import React from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportComponent from './report-home';

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
};

const ReportRoot: React.FC = () => {
  const reportingBasename = window.getOpenmrsSpaBase() + 'home/covid-report';

  return (
    <main>
      <SWRConfig value={swrConfiguration}>
        <BrowserRouter basename={reportingBasename}>
          <Routes>
            <Route path="/" element={<ReportComponent />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </main>
  );
};

export default ReportRoot;
