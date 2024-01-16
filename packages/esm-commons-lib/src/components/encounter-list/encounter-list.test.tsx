import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EncounterList } from './encounter-list.component';
import { openmrsFetch, usePagination } from '@openmrs/esm-framework';
import { OHRIOverflowMenu } from '../overflow-menu-button/ohri-overflow-menu.component';
import { mockColumns, mockEncounter, mockEncounterType, mockForms } from '../../../../../__mocks__/encounter-list.mock'; 

const testProps = {
  formConceptMap: {},
  patientUuid: 'some-uuid',
  encounterType: mockEncounterType,
  columns: mockColumns,
  headerTitle: 'Sample header title encounter list',
  description: 'Sample description encounter list',
  formList: mockForms,
  filter: jest.fn(),
  launchOptions: {
    moduleName: '',
    hideFormLauncher: false,
    displayText: '',
  },
};

const mockOpenmrsFetch = openmrsFetch as jest.Mock;
const mockUsePagination = usePagination as jest.Mock;

jest.mock('@openmrs/esm-framework', () => {
  const originalModule = jest.requireActual('@openmrs/esm-framework');

  return {
    ...originalModule,
    openmrsFetch: jest.fn(),
    usePagination: jest.fn().mockImplementation(() => ({
      currentPage: 1,
      goTo: () => {},
      results: [],
    })),
  };
});

// jest.mock('../../workspace/ohri-workspace-utils', () => {
//   const originalModule = jest.requireActual('../../workspace/ohri-workspace-utils');
//   return {
//     ...originalModule,
//     launchOHRIWorkSpace: jest.fn(),
//   };
// });

// jest.mock('../ohri-form-launcher/ohri-form-launcher.component', () => {
//   const originalModule = jest.requireActual('../ohri-form-launcher/ohri-form-launcher.component');

//   return {
//     ...originalModule,
//     OHRIFormLauncherWithIntent: jest.fn(({ formJsonList, launchForm, title }) => (
//       <OHRIOverflowMenu  menuTitle={title} overflowItems={formJsonList} launchForm={launchForm}  />
//     )),
//   };
// });

jest.mock('./helpers', () => {
  const originalModule = jest.requireActual('./helpers');

  return {
    ...originalModule,
    launchEncounterForm: jest.fn(),
  };
});

describe('EncounterList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading datatable skeleton', async () => {
    mockOpenmrsFetch.mockReturnValueOnce({
      encounters: [],
      error: null,
      isLoading: true,
    });


    await act(async () => {
      render(<EncounterList {...testProps} />);
    });

    const loadingSkeleton = screen.getByRole('table');
    expect(loadingSkeleton).toBeInTheDocument();
    expect(loadingSkeleton).toHaveClass('cds--data-table cds--data-table--md cds--data-table--sort');
  });

  test('renders an empty state if there is no data available', async () => {
    mockOpenmrsFetch.mockReturnValueOnce({ isLoading: false, error: null, encounters: [], onFormSave: jest.fn() });
    mockUsePagination.mockImplementation(() => ({
      currentPage: 1,
      goTo: () => {},
      results: [],
    }));
    await act(async () => {
      render(<EncounterList {...testProps} />);
    });
    expect(screen.getByText(/Sample header title encounter list/i)).toBeInTheDocument();
    expect(screen.getByText(/Items per page:/i)).toBeInTheDocument();
    expect(screen.getByText(/Previous page/i)).toBeInTheDocument();
    expect(screen.getByText(/Next page/i)).toBeInTheDocument();

  });

  test('should render the table component', async () => {
    mockOpenmrsFetch.mockReturnValueOnce({ data: mockEncounter });
    mockUsePagination.mockImplementation(() => ({
      currentPage: 1,
      goTo: () => {},
      results: mockEncounter,
    }));

    await act(async () => {
      render(<EncounterList {...testProps} />);
    });

    expect(screen.getByText('Sample header title encounter list')).toBeInTheDocument();
    expect(screen.getByText('Death Date')).toBeInTheDocument();
    expect(screen.getByText('Click to sort rows by Cause of Death header in ascending order')).toBeInTheDocument();
    expect(screen.getByText('Cause of Death')).toBeInTheDocument();
  });
});
