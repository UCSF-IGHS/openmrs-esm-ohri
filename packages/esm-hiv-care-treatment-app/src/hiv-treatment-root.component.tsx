import React from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './hiv-treatment-home.component';

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
};

const Root: React.FC = () => {
  const hivTreatmentBasename = window.getOpenmrsSpaBase() + 'home/care-and-treatment';

  return (
    <main>
      <SWRConfig value={swrConfiguration}>
        <BrowserRouter basename={hivTreatmentBasename}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </main>
  );
};

export default Root;
