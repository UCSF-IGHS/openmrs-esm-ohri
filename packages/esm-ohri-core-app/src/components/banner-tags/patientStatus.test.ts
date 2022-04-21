import { isPatientHivPositive } from './patientHivStatus';

describe('Patient HIV Status', () => {
  it('Should return positive', () => {
    let isHivPositive;
    isPatientHivPositive('b280078a-c0ce-443b-9997-3c66c63ec2f8').then(result => {
      isHivPositive = result;

      expect(isHivPositive).toBe(true);
    });
  });
});
