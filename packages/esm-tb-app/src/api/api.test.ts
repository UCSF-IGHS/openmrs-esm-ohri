import { getActiveDsCasesCount, getActiveDrCasesCount } from './api';
import { openmrsFetch } from '@openmrs/esm-framework';

/**
 * Shared test suite for functions that retrieve the count of active cases.
 * This suite tests both getActiveDsCasesCount and getActiveDrCasesCount functions.
 */

jest.mock('@openmrs/esm-framework');

describe('getActiveCasesCount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    {
      description: 'should return the count of active DS cases',
      functionToTest: getActiveDsCasesCount,
      reportId: 'total_active_ds_cases',
      mockResponse: {
        results: [
          {
            record: [
              {
                column: 'total_active_ds_cases',
                value: '0', // Assuming there are 0 Active DS Cases in this scenario
              },
            ],
          },
        ],
      },
      expectedCount: 0,
    },
    {
      description: 'should return the count of multiple active DR cases',
      functionToTest: getActiveDrCasesCount,
      reportId: 'total_active_dr_cases',
      mockResponse: {
        results: [
          {
            record: [
              {
                column: 'total_active_dr_cases',
                value: '11',
              },
            ],
          },
        ],
      },
      expectedCount: 11,
    },
  ];

  testCases.forEach(({ description, functionToTest, reportId, mockResponse, expectedCount }) => {
    it(description, async () => {
      (openmrsFetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await functionToTest();

      expect(openmrsFetch).toHaveBeenCalledWith(`ws/rest/v1/mamba/report?report_id=${reportId}`);
      expect(result).toBe(expectedCount);
    });
  });
});