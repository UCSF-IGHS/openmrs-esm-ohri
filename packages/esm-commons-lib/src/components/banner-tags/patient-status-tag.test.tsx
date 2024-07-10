import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatientStatusBannerTag } from './patient-status-tag.component';
import { usePatientsFinalHIVStatus } from './usePatientHivStatus';
import { useConfig } from '@openmrs/esm-framework';

const mockedUsePatientsFinalHIVStatus = jest.mocked(usePatientsFinalHIVStatus);
const mockUseConfig = jest.mocked(useConfig);

jest.mock('./usePatientHivStatus', () => {
  const originalModule = jest.requireActual('./usePatientHivStatus');

  return {
    ...originalModule,
    usePatientsFinalHIVStatus: jest.fn().mockImplementation(() => ({
      hivStatus: true,
      isLoading: false,
    })),
  };
});

describe('PatientStatusBannerTag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseConfig.mockReturnValue({
      obsConcepts: {
        finalHIVCodeConcept: 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab',
        finalPositiveHIVValueConcept: '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      },
    });
  });

  const samplePatientUuid = '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

  it('renders red tag when patient is HIV positive', async () => {
    render(<PatientStatusBannerTag patientUuid={samplePatientUuid} />);
    expect(screen.getByText(/HIV Positive/i)).toBeInTheDocument();
  });

  it('does not render red tag when patient is not HIV positive', async () => {
    mockedUsePatientsFinalHIVStatus.mockReturnValue({ hivStatus: false, isLoading: false, error: null });
    render(<PatientStatusBannerTag patientUuid={samplePatientUuid} />);
    expect(screen.queryByText('HIV Positive')).not.toBeInTheDocument();
  });
});
