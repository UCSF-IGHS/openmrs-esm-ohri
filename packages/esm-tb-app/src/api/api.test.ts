import { getActiveDsCasesCount, getActiveDrCasesCount } from './api';
import { openmrsFetch } from '@openmrs/esm-framework';
/**
 * Unit tests for the getActiveDsCasesCount function.
 *
 * These tests ensure that the function correctly retrieves and processes data
 * from the openmrsFetch when counting active DS cases.
 */

jest.mock('@openmrs/esm-framework');

describe('getActiveDsCasesCount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the count of active DS cases', async () => {
    const mockResponse = {
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
    };

    (openmrsFetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await getActiveDsCasesCount();

    expect(openmrsFetch).toHaveBeenCalledWith('ws/rest/v1/mamba/report?report_id=total_active_ds_cases');
    expect(result).toBe(0);
  });
});

/**
 * Unit tests for the getActiveDrCasesCount function.
 */
it('should return the count of multiple active DR cases', async () => {
  const mockResponse = {
    results: [
      {
        record: [
          {
            column: 'total_active_dr_cases',
            value: '11', // Assuming there are 11 Active DR Cases in this scenario
          },
        ],
      },
    ],
  };

  (openmrsFetch as jest.Mock).mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  const result = await getActiveDrCasesCount();

  expect(openmrsFetch).toHaveBeenCalledWith('ws/rest/v1/mamba/report?report_id=total_active_dr_cases');
  expect(result).toBe(11);
});