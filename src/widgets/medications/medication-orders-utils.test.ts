import { formatDuration, getDosage, setDefaultValues } from './medication-orders-utils';
import commonMedicationJson from './common-medication.json';

describe('MedicationOrderUtils', () => {
  it('should return the correct dosage', () => {
    let results = getDosage('80mg', 3);
    expect(results).toBe('240 mg');
  });

  it('should return the correct dosage when given a concentration', () => {
    let results = getDosage('80mg/400mg', 5);
    expect(results).toBe('5 mg (25 mg)');
  });

  it('should return the correct default medication orders', () => {
    let results = setDefaultValues(commonMedicationJson);
    expect(results).toBeDefined();
  });

  it('should infer the correct duration and duration units from the medication order', () => {
    let result = formatDuration({
      duration: 1,
      durationUnits: { display: 'days' },
    });
    expect(result).toEqual('1 day');

    let nextResult = formatDuration({
      duration: 2,
      durationUnits: { display: 'days' },
    });
    expect(nextResult).toEqual('2 days');
  });
});
