import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatientStatusBannerTag } from './patient-status-tag.component';
import { usePatientHivStatus } from './patientHivStatus';
import { usePatientOutcome } from './useInfantFinalOutcome';
import { usePatientFamilyNames } from './usePatientFamilyNames';

jest.mock('./patientHivStatus', () => ({
  usePatientHivStatus: jest.fn(),
}));

jest.mock('./useInfantFinalOutcome', () => ({
  usePatientOutcome: jest.fn(),
}));

jest.mock('./usePatientFamilyNames', () => ({
  usePatientFamilyNames: jest.fn(),
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

    (usePatientOutcome as jest.Mock).mockReturnValue({
      patientOutcome: null,
    });

    (usePatientFamilyNames as jest.Mock).mockReturnValue({
      childrenNames: [],
      motherName: null,
      patientAge: null,
      patientGender: null,
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

    (usePatientOutcome as jest.Mock).mockReturnValue({
      patientOutcome: 'Still in Care',
    });

    (usePatientFamilyNames as jest.Mock).mockReturnValue({
      childrenNames: [],
      motherName: null,
      patientAge: null,
      patientGender: null,
      isLoading: false,
      isError: false,
    });

    render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    expect(screen.getByText('HIV Positive')).toBeInTheDocument();
    expect(screen.getByText('Still in Care')).toBeInTheDocument();
  });

  it('should display the correct tag for HIV negative status', () => {
    (usePatientHivStatus as jest.Mock).mockReturnValue({
      hivStatus: 'negative',
      isLoading: false,
      isError: false,
    });

    (usePatientOutcome as jest.Mock).mockReturnValue({
      patientOutcome: 'Confirmed HIV negative infant (discharged from PMTCT)',
    });

    (usePatientFamilyNames as jest.Mock).mockReturnValue({
      childrenNames: [],
      motherName: null,
      patientAge: null,
      patientGender: null,
      isLoading: false,
      isError: false,
    });

    render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    expect(screen.getByText('HIV Negative')).toBeInTheDocument();
    expect(screen.getByText('Confirmed HIV negative infant (discharged from PMTCT)')).toBeInTheDocument();
  });

  it('should display mother’s name on the Infant banner', () => {
    (usePatientHivStatus as jest.Mock).mockReturnValue({
      hivStatus: 'negative',
      isLoading: false,
      isError: false,
    });

    (usePatientOutcome as jest.Mock).mockReturnValue({
      patientOutcome: 'Still in Care',
    });

    (usePatientFamilyNames as jest.Mock).mockReturnValue({
      childrenNames: [],
      motherName: 'Jane Doe',
      patientAge: 10,
      patientGender: 'M',
      isLoading: false,
      isError: false,
    });

    render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    expect(screen.getByText('Mother: Jane Doe')).toBeInTheDocument();
  });

  it('should show an error message when there is an error fetching data', () => {
    (usePatientHivStatus as jest.Mock).mockReturnValue({
      hivStatus: null,
      isLoading: false,
      isError: false,
    });

    (usePatientOutcome as jest.Mock).mockReturnValue({
      patientOutcome: null,
    });

    (usePatientFamilyNames as jest.Mock).mockReturnValue({
      childrenNames: [],
      motherName: null,
      patientAge: null,
      patientGender: null,
      isLoading: false,
      isError: true,
    });

    render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
    expect(screen.getByText('Error fetching family information')).toBeInTheDocument();
  });
});
