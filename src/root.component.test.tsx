import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.component';

window['getOpenmrsSpaBase'] = jest.fn().mockImplementation(() => '/');

describe('root component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Root />, div);
  });
});
