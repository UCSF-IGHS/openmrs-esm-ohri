import React from 'react';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { dashboardPath, spaRoot, basePath } from './constants';
import styles from './root.scss';

const swrConfiguration = {
  // Maximum number of retries when the backend returns an error
  errorRetryCount: 3,
};

export default function Root() {
  return (
    // This SWRConfig very probably does not do anything, because other apps and extensions
    // do not receive this context. If we want to set SWRConfig we would probably need to
    // do in openmrsComponentDecorator in esm-core.
    <SWRConfig value={swrConfiguration}>
      <BrowserRouter basename={spaRoot}></BrowserRouter>
    </SWRConfig>
  );
}
