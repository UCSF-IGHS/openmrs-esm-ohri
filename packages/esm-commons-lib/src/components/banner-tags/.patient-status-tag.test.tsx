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
  const patientUuid = '22ab3fdb-1510-4675-85aa-f180064de450';

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

  it('should display the correct outcome tag', () => {
    render(<PatientStatusBannerTag patientUuid="patientUuid" mappedOutcome="Dead" outcomeTagColor="red" />);
    expect(screen.getByText('Dead')).toBeInTheDocument();
  });

  it('should display the mother tag', () => {
    render(<PatientStatusBannerTag patientUuid="patientUuid" motherName="Jane Doe" />);
    expect(screen.getByText('Mother: Jane Doe')).toBeInTheDocument();
  });

  it('should not display children tag if childrenNames is empty', () => {
    render(<PatientStatusBannerTag patientUuid={patientUuid} patientGender="F" childrenNames={[]} />);
    expect(screen.queryByText('Children:')).toBeNull();
  });

  it('should display children tag for female patients', () => {
    render(
      <PatientStatusBannerTag
        patientUuid={patientUuid}
        patientGender="F"
        childrenNames={['Mark obadi', 'Grace Obadi']}
      />,
    );
    expect(screen.getByText('Children: Mark obadi || Grace Obadi')).toBeInTheDocument();
  });
});
