import { openmrsFetch } from '@openmrs/esm-framework';
import capitalize from 'lodash/capitalize';

const BASE_WS_API_URL = '/ws/rest/v1/';

export const snakeCaseToCapitalizedWords = (snakeCaseString) => snakeCaseString.split('_').map(capitalize).join(' ');

export const fetchReportData = async (url) => {
  const response = await openmrsFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return response.json();
};

export const constructReportUrl = (reportId, parameterValues) => {
  const params = new URLSearchParams({
    report_id: reportId,
    ...parameterValues,
  });
  return `${BASE_WS_API_URL}mamba/report?${params.toString()}`;
};