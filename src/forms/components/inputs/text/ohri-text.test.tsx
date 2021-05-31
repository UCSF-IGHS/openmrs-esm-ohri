import React, { useContext } from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { Formik, Form } from 'formik';
import OHRITextObs from './ohri-text.component';
import { OHRIFormContext } from '../../../ohri-form-context';
import { mockPatient } from '../../../../../__mocks__/patient.mock';
import { mockEncounter } from '../../../../../__mocks__/encounter.mock';

const questionObject = {
  label: 'Just checking',
  type: 'obs',
  questionOptions: {
    rendering: 'number',
    concept: '5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    max: '300',
    min: '0',
    showDate: '',
    conceptMappings: [
      {
        type: 'LOINC',
        value: '8480-6',
      },
      {
        type: 'AMPATH',
        value: '5085',
      },
      {
        type: 'CIEL',
        value: '5085',
      },
      {
        type: 'PIH',
        value: '5085',
      },
      {
        type: 'SNOMED CT',
        value: 'CT: 271649006',
      },
      {
        type: 'PIH Malawi',
        value: 'Malawi: 5085',
      },
      {
        type: 'org.openmrs.module.mdrtb',
        value: 'SYSTOLIC BLOOD PRESSURE',
      },
    ],
  },
  id: 'sbp',
  hide: '',
};

describe('text input field', () => {
  const setupInput = async () => {
    render(
      <Formik initialValues={questionObject} onSubmit={null}>
        {props => (
          <Form>
            <OHRIFormContext.Provider
              value={{
                values: props.values,
                setFieldValue: props.setFieldValue,
                setEncounterLocation: () => {},
                encounterContext: {
                  patient: mockPatient,
                  encounter: mockEncounter,
                  location: location,
                  sessionMode: 'enter',
                  date: new Date(),
                },
              }}>
              <OHRITextObs question={questionObject} onChange={null} />
            </OHRIFormContext.Provider>
          </Form>
        )}
      </Formik>,
    );
    return screen.getByLabelText('Just checking') as HTMLInputElement;
  };

  it('exists', async () => {
    const input = await setupInput();
    expect(input.type).toEqual('text');
  });
});
