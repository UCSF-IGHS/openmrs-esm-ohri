import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Routes>
        <Route path="/ptracker-report" />
      </Routes>
    </BrowserRouter>
  );
}
