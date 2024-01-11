import React from 'react';
import { mockTableHeaders, mockTableRows } from '../../../../../__mocks__/obs-base-table.mock';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OTable } from './o-table.component';

const testProps = {
  tableHeaders: mockTableHeaders,
  tableRows: mockTableRows,
};

jest.setTimeout(20000);

jest.mock('@openmrs/esm-framework', () => ({
  ...jest.requireActual('@openmrs/esm-framework'),
  useLayoutType: jest.fn(() => 'small-desktop'),
}));

describe('ObsTable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the table component', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<OTable {...testProps} />);
    });
    expect(screen.getAllByText('General population'));
    expect(screen.getAllByText('06 — Oct — 2023'));
    expect(screen.getAllByText('09 — Oct — 2023'));
    expect(screen.getAllByText('Mother enrolled in prevention of maternal to child transmission (PMTCT) program'));
    expect(screen.getByText('Click to sort rows by Enrollment Date header in ascending order')).toBeInTheDocument();
    expect(screen.getAllByText('Transfer-in'));
    expect(screen.getAllByText('Target population'));
    const expectedColumnHeaders = [
      /Enrollment Date/,
      /Patient Type at Enrollment/,
      /Date Confirmed HIV Positive/,
      /Entry Point/,
      /Population Category/,
      /Actions/,
    ];
    expectedColumnHeaders.forEach((header) => {
      expect(screen.getByRole('columnheader', { name: new RegExp(header, 'i') })).toBeInTheDocument();
    });
  });
});
