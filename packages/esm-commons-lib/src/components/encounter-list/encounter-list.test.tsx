import '@testing-library/jest-dom';
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { EncounterList } from './encounter-list.component';
import { mockColumns, mockEncounter, mockEncounterType, mockForms } from '../../../../../__mocks__/encounter-list.mock';
import * as encounterRowsHook from '../../hooks/useEncounterRows';
import * as formsJsonHook from '../../hooks/useFormsJson';

const emptyTestProps = {
  formConceptMap: {},
  patientUuid: 'some-uuid',
  encounterType: mockEncounterType,
  columns: [],
  headerTitle: 'Sample header title encounter list',
  description: 'Sample description encounter list',
  formList: [],
  filter: jest.fn(),
  launchOptions: {
    moduleName: '',
    hideFormLauncher: false,
    displayText: '',
  },
};

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

jest.mock('../../hooks/useEncounterRows');
jest.mock('../../hooks/useFormsJson');

jest.mock('@openmrs/esm-patient-common-lib', () => ({
  launchPatientWorkspace: jest.fn(),
}));

jest.mock('@openmrs/openmrs-form-engine-lib', () => ({
  FormEngine: jest
    .fn()
    .mockImplementation(() => React.createElement('div', { 'data-testid': 'openmrs form' }, 'FORM ENGINE LIB')),
}));

describe('EncounterList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders an loading state if data is loading', () => {
    jest
      .spyOn(encounterRowsHook, 'useEncounterRows')
      .mockReturnValue({ encounters: [], isLoading: true, error: null, onFormSave: () => {} });

    jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: true });

    act(() => {
      render(<EncounterList {...emptyTestProps} />);
    });
    const element = document.querySelector('.cds--skeleton.cds--data-table-container');
    expect(element).not.toBeNull();
  });

  test('renders an empty state if data is null', () => {
    jest
      .spyOn(encounterRowsHook, 'useEncounterRows')
      .mockReturnValue({ encounters: [], isLoading: false, error: null, onFormSave: () => {} });

    jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: false });

    act(() => {
      render(<EncounterList {...emptyTestProps} />);
    });
    expect(
      screen.getByText('There are no sample description encounter list to display for this patient'),
    ).toBeInTheDocument();
  });

  test('should render the encounter list component', () => {
    jest.spyOn(encounterRowsHook, 'useEncounterRows').mockReturnValue({
      encounters: mockEncounter,
      isLoading: false,
      error: null,
      onFormSave: () => {},
    });
    jest.spyOn(formsJsonHook, 'useFormsJson').mockReturnValue({ formsJson: [], isLoading: false });

    act(() => {
      render(<EncounterList {...testProps} />);
    });
    expect(screen.getByText('Sample header title encounter list')).toBeInTheDocument();
    expect(screen.getByText('Death Date')).toBeInTheDocument();
    expect(screen.getByText('Click to sort rows by Cause of Death header in ascending order')).toBeInTheDocument();
    expect(screen.getByText('Cause of Death')).toBeInTheDocument();
  });
});
