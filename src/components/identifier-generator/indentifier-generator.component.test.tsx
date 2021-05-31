import * as React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import { IdentifierGenerator } from './identifier-generator.component';
import { shallow } from 'enzyme';

it('HTS Number Title is displayed', () => {
  render(<IdentifierGenerator />);
  const title = screen.getByTestId('unique-title');
  expect(title).toHaveTextContent('Unique HTS Number (generated)');
});

it('Test button click working as it should', () => {
  let mockClick = jest.fn();
  let wrapper = shallow(<IdentifierGenerator generateId={mockClick} />);
  wrapper.find('[data-testid="renew-click"]').simulate('click');
  expect(mockClick.mock.calls.length).toEqual(1);
});
