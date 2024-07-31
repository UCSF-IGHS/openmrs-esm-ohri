import { useConfig } from '@openmrs/esm-framework';
import { usePatientHivStatus, usePatientHtsEncounters } from './patientHivStatus';
import { renderHook } from '@testing-library/react';

jest.mock('@openmrs/esm-framework', () => ({
  openmrsFetch: jest.fn(),
  useConfig: jest.fn(),
}));

jest.mock('../../api.resource', () => ({
  fetchPatientsFinalHIVStatus: jest.fn(),
  fetchPatientComputedConcept_HIV_Status: jest.fn(),
}));

const mockUseConfig = useConfig as jest.Mock;

describe('usePatientHtsEncounters', () => {
  it('should return loading state initially', () => {
    mockUseConfig.mockReturnValue({
      encounterTypes: { antenatalEncounterType: '677d1a80-dbbe-4399-be34-aa7f54f11405' },
    });

    const { result } = renderHook(() => usePatientHtsEncounters('1a4d8ff9-a95f-4c18-9b24-a59bd40b3fc0'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.encounters).toEqual([]);
  });
});

describe('usePatientHivStatus', () => {
  it('should return loading state initially', () => {
    mockUseConfig.mockReturnValue({
      encounterTypes: { antenatalEncounterType: '677d1a80-dbbe-4399-be34-aa7f54f11405' },
      obsConcepts: {
        hivTestResultConceptUUID: '159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        positiveUUID: '138571AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        negativeUUID: '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      },
    });

    const { result } = renderHook(() => usePatientHivStatus('1a4d8ff9-a95f-4c18-9b24-a59bd40b3fc0'));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.hivStatus).toBe(null);
  });
});
