import React from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TptHome from './tpt-home.component';

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
};

const TptRoot: React.FC = () => {
  const tbBasename = window.getOpenmrsSpaBase() + 'home/tpt-cases';

  return (
    <main>
      <SWRConfig value={swrConfiguration}>
        <BrowserRouter basename={tbBasename}>
          <Routes>
            <Route path="/" element={<TptHome />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </main>
  );
};

export default TptRoot;
