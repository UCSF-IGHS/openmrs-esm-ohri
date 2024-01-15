import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import { OHRIProgrammeSummaryTiles } from './ohri-programme-summary-tiles.component';
import { OHRISummaryTileTablet } from './ohri-summary-tile-tablet.component';

// Mock data for OHRIProgrammeSummaryTiles
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

// Mock data for OHRISummaryTileTablet
const mockDetails = [
  {
    subTitle: 'Sample Subtitle',
    value: 25,
  },
];

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

describe('OHRISummaryTileTablet', () => {
  it('should render the tablet summary tile', () => {
    render(<OHRISummaryTileTablet details={mockDetails} />);

    // Check if the title is rendered
    expect(screen.getByText('Programme summary')).toBeInTheDocument();

    mockDetails.forEach((detail) => {
      expect(screen.getByText(detail.subTitle)).toBeInTheDocument();
      expect(screen.getByText(detail.value.toString())).toBeInTheDocument();
    });
  });
});
