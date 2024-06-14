import React from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home.component';

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
};

const RootComponent: React.FC = () => {
  const mchBasename = window.getOpenmrsSpaBase() + 'home/mother-child-health';

  return (
    <main>
      <SWRConfig value={swrConfiguration}>
        <BrowserRouter basename={mchBasename}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </main>
  );
};

export default RootComponent;
