import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { OHRIProgrammeSummaryTiles } from './ohri-programme-summary-tiles.component';

const mockProps = {
  tiles: [
    {
      title: 'Vaccinations',
      linkAddress: '#',
      subTitle: 'People vaccinated',
      value: 100,
      onClick: jest.fn(),
    },
  ],
};

describe('OHRIProgrammeSummaryTiles', () => {
  it('should display the summary tiles as expected', () => {
    render(<OHRIProgrammeSummaryTiles {...mockProps} />);
    mockProps.tiles.forEach((tile) => {
      expect(screen.getByText(tile.title)).toBeInTheDocument();
      const subTitleElements = screen.getAllByText(tile.subTitle);
      expect(subTitleElements.length).toBeGreaterThan(0);
      const valueElements = screen.getAllByText(tile.value.toString());
      expect(valueElements.length).toBeGreaterThan(0);
    });
  });
});
