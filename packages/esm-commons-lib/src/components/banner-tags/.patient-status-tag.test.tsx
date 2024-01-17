import React from 'react';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PatientStatusBannerTag } from './patient-status-tag.component';
import { isPatientHivPositive } from './patientHivStatus';

const mockIsPatientHivPositive = isPatientHivPositive as jest.Mock;
jest.mock('./patientHivStatus');

describe('PatientStatusBannerTag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const hivPositiveSampleUuid = '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

  describe('PatientStatusBannerTag', () => {
    it('renders red tag when patient is HIV positive', async () => {
      mockIsPatientHivPositive.mockResolvedValue(true);
       await act(async () => {
        render(<PatientStatusBannerTag patientUuid={hivPositiveSampleUuid} />);
      });

      expect(screen.getByText(/HIV Positive/i)).toBeInTheDocument();
    });
  });

  it('does not render red tag when patient is not HIV positive', async () => {
    await act(async () => {
      (isPatientHivPositive as jest.Mock).mockResolvedValue(false);
      render(<PatientStatusBannerTag patientUuid="sampleUuid" />);
    });

    expect(screen.queryByText('HIV Positive')).not.toBeInTheDocument();
  });
});
