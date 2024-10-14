import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EncounterTile, EncounterValuesTile } from './encounter-tile.component';
import { column, mockColumns, mocklastEncounter, patientUuid } from '../../../../../__mocks__/encounter-tile.mock';
import { useLastEncounter } from '../../hooks/useLastEncounter';
import { openmrsFetch } from '@openmrs/esm-framework';

const obsTestProps = {
  patientUuid: patientUuid,
  column: column,
};

const tileTestProps = {
  patientUuid: patientUuid,
  columns: mockColumns,
  headerTitle: 'Test header title',
};

const mockOpenmrsFetch = openmrsFetch as jest.Mock;
mockOpenmrsFetch.mockImplementation(jest.fn());

const mockUseLastEncounter = useLastEncounter as jest.Mock;
jest.mock('../../hooks/useLastEncounter');

describe('Encounter tile component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading skeleton when observations are not available', () => {
    mockUseLastEncounter.mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });

    render(<EncounterValuesTile {...obsTestProps} />);
    const skeletonElement = screen.getByTestId('skeleton-text');
    expect(skeletonElement).toBeInTheDocument();
  });

  test('renders observations when they are available', async () => {
    mockUseLastEncounter.mockReturnValue({
      isLoading: false,
      lastEncounter: mocklastEncounter,
      error: null,
    });

    await act(async () => {
      render(<EncounterValuesTile {...obsTestProps} />);
    });

    expect(screen.getByText(/Next Appointment Date/)).toBeInTheDocument();
    expect(screen.getByText(/2023 - 12 - 01/)).toBeInTheDocument();
  });

  test('renders observations tile when they are available', async () => {
    await act(async () => {
      render(<EncounterTile {...tileTestProps} />);
    });

    expect(screen.getByText(/Test header title/)).toBeInTheDocument();
    expect(screen.getByText(/TB Screening/)).toBeInTheDocument();
    expect(screen.getAllByText(/Positive/));
    expect(screen.getByText(/OIs/)).toBeInTheDocument();
    expect(screen.getAllByText(/--/));
    expect(screen.getByText(/Next Appointment Date/)).toBeInTheDocument();
    expect(screen.getAllByText(/2023 - 12 - 01/));
    expect(screen.getByText(/Program Status/)).toBeInTheDocument();
    expect(screen.getAllByText(/Active/));
  });
});
