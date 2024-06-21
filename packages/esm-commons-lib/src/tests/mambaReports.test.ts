import { fetchMambaReportData } from '../api.resource';
import { openmrsFetch } from '@openmrs/esm-framework';
import '@testing-library/jest-dom';

jest.mock('@openmrs/esm-framework');

describe('fetchMambaReportData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches report data successfully and parses result', async () => {
    const reportId = 'test-report-id';

    const mockResponse: any = {
      data: {
        results: [
          {
            record: [{ value: '0' }],
          },
        ],
      },
      json: jest.fn().mockResolvedValue({}),
    };

    (openmrsFetch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchMambaReportData(reportId);

    expect(openmrsFetch).toHaveBeenCalledWith(`ws/rest/v1/mamba/report?report_id=${reportId}`);
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual(0);
  });
});
