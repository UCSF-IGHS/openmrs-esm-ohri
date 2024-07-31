import React from 'react';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatientStatusBannerTag } from './patient-status-tag.component';
import { usePatientHivStatus } from './patientHivStatus';

jest.mock('./patientHivStatus');

const mockusePatientHivStatus = usePatientHivStatus as jest.Mock;

describe('PatientStatusBannerTag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const hivPositiveSampleUuid = '138571AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

  it('renders red tag when patient is HIV positive', async () => {
    mockusePatientHivStatus.mockReturnValue({
      hivStatus: 'positive',
      isLoading: false,
      isError: false,
    });

    await act(async () => {
      render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    });

    expect(screen.getByText(/HIV Positive/i)).toBeInTheDocument();
  });

  it('renders green tag when patient is HIV negative', async () => {
    mockusePatientHivStatus.mockReturnValue({
      hivStatus: 'negative',
      isLoading: false,
      isError: false,
    });

    await act(async () => {
      render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    });

    expect(screen.getByText(/HIV Negative/i)).toBeInTheDocument();
  });

  it('does not render any tag when patient HIV status is not positive or negative', async () => {
    mockusePatientHivStatus.mockReturnValue({
      hivStatus: 'other',
      isLoading: false,
      isError: false,
    });

    await act(async () => {
      render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    });

    expect(screen.queryByText(/HIV Positive/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/HIV Negative/i)).not.toBeInTheDocument();
  });

  it('shows loading state initially', async () => {
    mockusePatientHivStatus.mockReturnValue({
      hivStatus: null,
      isLoading: true,
      isError: false,
    });

    await act(async () => {
      render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    });

    expect(screen.queryByText(/HIV Positive/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/HIV Negative/i)).not.toBeInTheDocument();
  });

  it('handles error state', async () => {
    mockusePatientHivStatus.mockReturnValue({
      hivStatus: null,
      isLoading: false,
      isError: true,
    });

    await act(async () => {
      render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    });

    expect(screen.queryByText(/HIV Positive/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/HIV Negative/i)).not.toBeInTheDocument();
    // Optionally check for an error message if your component shows one
  });
});
