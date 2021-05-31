import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from './home.component';

describe(`<Home />`, () => {
  afterEach(cleanup);
  it(`renders without dying`, () => {
    render(<Home />);
  });
});
