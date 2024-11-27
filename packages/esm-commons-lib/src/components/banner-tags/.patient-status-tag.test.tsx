import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatientStatusBannerTag } from './patient-status-tag.component';
import { usePatientHivStatus } from './patientHivStatus';

jest.mock('./patientHivStatus', () => ({
  usePatientHivStatus: jest.fn(),
}));

describe('PatientStatusBannerTag', () => {
  const hivPositiveSampleUuid = '138571AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render anything while loading', () => {
    (usePatientHivStatus as jest.Mock).mockReturnValue({
      hivStatus: null,
      isLoading: true,
      isError: false,
    });

    const { container } = render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    expect(container.firstChild).toBeNull();
  });

  it('should display the correct tag for HIV positive status', () => {
    (usePatientHivStatus as jest.Mock).mockReturnValue({
      hivStatus: 'positive',
      isLoading: false,
      isError: false,
    });

    render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    expect(screen.getByText('HIV Positive')).toBeInTheDocument();
  });

  it('should display the correct tag for HIV negative status', () => {
    (usePatientHivStatus as jest.Mock).mockReturnValue({
      hivStatus: 'negative',
      isLoading: false,
      isError: false,
    });

    render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    expect(screen.getByText('HIV Negative')).toBeInTheDocument();
  });
});
