import * as React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import EmptyState from './empty-state.component';
import { shallow } from 'enzyme';
afterEach(cleanup);

it('Test if element is in document', () => {
  render(<EmptyState headerTitle="Header" displayText="Certain Text" />);
  const headerElement = screen.getByTestId('header-title');
  expect(headerElement).toBeInTheDocument();
});

it('Test if element has correct header', () => {
  render(<EmptyState headerTitle="Header" displayText="Certain Text" />);
  const headerElement = screen.getByTestId('header-title');
  expect(headerElement).toHaveTextContent('Header');
});

it('Test If Element is rendering correct DisplayText', () => {
  render(<EmptyState headerTitle="Header" displayText="Certain Text" />);
  const displayText = screen.getByTestId('display-text');
  expect(displayText).toHaveTextContent('Record certain text');
});

it('Tests if element is rendering correct message for no display Text', () => {
  render(<EmptyState headerTitle="Header" displayText="Certain Text" />);
  const displayText = screen.getByTestId('inexistent-text');
  expect(displayText).toHaveTextContent('There are no certain text to display for this patient');
});

it('Runs the launchform function to verify if it runs', () => {
  const mockCallback = jest.fn();
  const link = shallow(<EmptyState headerTitle="Header" displayText="Certain Text" launchForm={mockCallback} />);
  link.find('[data-testid="click-link"]').simulate('click');
  expect(mockCallback.mock.calls.length).toEqual(1);
});

it('Matches Snapshot', () => {
  const tree = renderer.create(<EmptyState headerTitle="Header" displayText="Certain Text" />).toJSON();
  expect(tree).toMatchSnapshot();
});
