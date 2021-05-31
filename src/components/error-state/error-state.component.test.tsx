import * as React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import EmptyState from './error-state.component';

afterEach(cleanup);

const error = {
  response: {
    status: 200,
    statusText: 'There was an issue getting the information from the server',
  },
};

it('Test if component is able to render the title', () => {
  render(<EmptyState headerTitle="Header" error={error} />);
  const headerElement = screen.getByTestId('header-title');
  expect(headerElement).toBeInTheDocument();
});

it('Test if component matches snapshot', () => {
  const tree = renderer.create(<EmptyState headerTitle="Header" error={error} />).toJSON();
  expect(tree).toMatchSnapshot();
});
