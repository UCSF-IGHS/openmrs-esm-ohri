import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import MedicationRecord from './medication-record.component';
import { match, useRouteMatch, BrowserRouter } from 'react-router-dom';
import { useCurrentPatient, openmrsFetch } from '@openmrs/esm-api';
import { mockPatient } from '../../../__mocks__/patient.mock';
import { mockMedicationOrderByUuidResponse } from '../../../__mocks__/medication.mock';

const mockUseRouteMatch = useRouteMatch as jest.Mock;
const mockUseCurrentPatient = useCurrentPatient as jest.Mock;
const mockOpenmrsFetch = openmrsFetch as jest.Mock;

jest.mock('@openmrs/esm-api', () => ({
  useCurrentPatient: jest.fn(),
  openmrsFetch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: jest.fn(),
}));

describe('<MedicationRecord />', () => {
  let patient: fhir.Patient = mockPatient;
  let match: match = {
    params: { medicationUuid: 'bbd27a2f-442a-418a-9952-f2bb0e54df97' },
    isExact: true,
    path: '/patient/:patientUuid/chart/medications/:medicationUuid',
    url: '/',
  };
  let wrapper: any;

  afterEach(cleanup);

  beforeEach(() => {
    mockUseRouteMatch.mockReset();
  });

  it('renders without dying', async () => {
    mockUseCurrentPatient.mockReturnValue([false, patient, patient.id, null]);
    mockUseRouteMatch.mockReturnValue(match);
    mockOpenmrsFetch.mockReturnValue(Promise.resolve(mockMedicationOrderByUuidResponse));
    wrapper = render(
      <BrowserRouter>
        <MedicationRecord />
      </BrowserRouter>,
    );

    await wait(() => {
      expect(wrapper).toBeDefined();
    });
  });

  it('displays the selected medication correctly', async () => {
    mockUseCurrentPatient.mockReturnValue([false, patient, patient.id, null]);
    mockUseRouteMatch.mockReturnValue(match);
    mockOpenmrsFetch.mockReturnValue(Promise.resolve(mockMedicationOrderByUuidResponse));

    wrapper = render(
      <BrowserRouter>
        <MedicationRecord />
      </BrowserRouter>,
    );

    await wait(() => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getByText('Medication').textContent).toBeTruthy();
      expect(wrapper.getByText('Edit').textContent).toBeTruthy();
      expect(wrapper.getAllByText('sulfadoxine').length).toBe(2);
      expect(wrapper.getByText('capsule').textContent).toBeTruthy();
      expect(wrapper.getByText('oral').textContent).toBeTruthy();
      expect(wrapper.getByText('DOSE').textContent).toBeTruthy();
      expect(wrapper.getByText('1000 mg').textContent).toBeTruthy();
      expect(wrapper.getByText('Once daily').textContent).toBeTruthy();
      expect(wrapper.getByText('Start date').textContent).toBeTruthy();
      expect(wrapper.getByText('Substitutions permitted').textContent).toBeTruthy();
      expect(wrapper.getByText('Wednesday 19-Feb-2020').textContent).toBeTruthy();
      expect(wrapper.getByText('End date').textContent).toBeTruthy();
      expect(wrapper.getByText('Dosing instructions').textContent).toBeTruthy();
      expect(wrapper.getByText('none').textContent).toBeTruthy();
      expect(wrapper.getByText('Duration').textContent).toBeTruthy();
      expect(wrapper.getByText('5 Days').textContent).toBeTruthy();
      expect(wrapper.getByText('Total number of refills').textContent).toBeTruthy();
      expect(wrapper.getByText('5').textContent).toBeTruthy();
    });
  });

  it("displays the selected medication's audit information correctly", async () => {
    mockUseCurrentPatient.mockReturnValue([false, patient, patient.id, null]);
    mockUseRouteMatch.mockReturnValue(match);
    mockOpenmrsFetch.mockReturnValue(Promise.resolve(mockMedicationOrderByUuidResponse));

    wrapper = render(
      <BrowserRouter>
        <MedicationRecord />
      </BrowserRouter>,
    );

    await wait(() => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getByText('Last updated').textContent).toBeTruthy();
      expect(wrapper.getByText('Last updated by').textContent).toBeTruthy();
      expect(wrapper.getByText('Last updated location').textContent).toBeTruthy();
      expect(wrapper.getByText('19-Feb-2020').textContent).toBeTruthy();
      expect(wrapper.getByText('Fifty User').textContent).toBeTruthy();
      expect(wrapper.getByText('Location Test').textContent).toBeTruthy();
    });
  });
});
