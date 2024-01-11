import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { act, screen, render } from '@testing-library/react';
import { OHRISummaryTile } from './ohri-summary-tile.component';

const mockProps = {
  title: 'Sample Title',
  subTitle: 'Sample Subtitle',
  value: 3077,
  onClickView: () => null,
};

describe('ohri summary tiles', () => {
  it('should display props on the UI', () => {
    render(<OHRISummaryTile {...mockProps} />);

    screen.debug();

    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Subtitle/i)).toBeInTheDocument();
    expect(screen.getByText(/3077/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });
});
