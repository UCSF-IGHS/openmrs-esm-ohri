import { openmrsFetch } from '@openmrs/esm-framework';

async function fetchReportData(reportId: string) {
  try {
    const response = await openmrsFetch(`ws/rest/v1/mamba/report?report_id=${reportId}`);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const record = data.results[0].record;

      for (const item of record) {
        return item.value ? parseInt(item.value, 10) : 0;
      }
    }

    return 0;
  } catch (error) {
    console.error(`Error fetching data for report_id=${reportId}: `, error);
    throw new Error(`Error fetching data for report_id=${reportId}: ${error}`);
  }
}

// Get count of Active DS Cases
export async function getActiveDsCasesCount() {
  return await fetchReportData('total_active_ds_cases');
}

// Get count of Active DR Cases
export async function getActiveDrCasesCount() {
  return await fetchReportData('total_active_dr_cases');
}