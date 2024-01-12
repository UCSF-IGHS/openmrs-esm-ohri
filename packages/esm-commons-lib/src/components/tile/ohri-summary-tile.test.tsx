import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
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

    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Subtitle/i)).toBeInTheDocument();
    expect(screen.getByText(/3077/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });
});
