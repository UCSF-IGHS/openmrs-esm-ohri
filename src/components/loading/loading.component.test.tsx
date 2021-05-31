import * as React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import LoadingIcon from './loading.component';

it('Test if loading component is loaded', () => {
  render(<LoadingIcon />);
  const loadingIcon = screen.getByTestId('loading');
  expect(loadingIcon).toBeInTheDocument();
});
