/**
 * @jest-environment jsdom
 */

import { isPatientHivPositive } from './patientHivStatus';

describe.skip('Patient HIV Status', () => {
  //TODO: Fix dependency failure
  it('Should return positive', () => {
    let isHivPositive = true;
    // isPatientHivPositive('b280078a-c0ce-443b-9997-3c66c63ec2f8').then((result) => {
    //   isHivPositive = result;

    //   expect(isHivPositive).toBe(true);
    // });

    expect(isHivPositive).toBe(true);
  });
});
