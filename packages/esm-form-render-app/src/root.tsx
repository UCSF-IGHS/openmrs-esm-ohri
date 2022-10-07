import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormRenderTest from './render/forms-render-test.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Routes>
        <Route path="/form-render-test" element={<FormRenderTest />} />
      </Routes>
    </BrowserRouter>
  );
}
