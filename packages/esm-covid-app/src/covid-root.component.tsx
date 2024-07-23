import React from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CovidHome from './covid-home.component';

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
};

const CovidRoot: React.FC = () => {
  const covidBasename = window.getOpenmrsSpaBase() + 'home/covid-cases';

  return (
    <main>
      <SWRConfig value={swrConfiguration}>
        <BrowserRouter basename={covidBasename}>
          <Routes>
            <Route path="/" element={<CovidHome />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </main>
  );
};

export default CovidRoot;
