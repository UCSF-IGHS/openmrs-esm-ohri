import { openmrsFetch } from '@openmrs/esm-framework';

//  Get count of Active DS Cases
export async function getActiveDsCasesCount() {
  try {
    const response = await openmrsFetch('ws/rest/v1/mamba/report?report_id=total_active_ds_cases');
    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      const record = data.results[0].record;

      for (const item of record) {
        if (item.column === 'total_active_ds_cases') {
          return parseInt(item.value);
        }
      }
    }
    return 0;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
}

//  Get count of Active DR Cases
export async function getActiveDrCasesCount() {
  try {
    const response = await openmrsFetch('ws/rest/v1/mamba/report?report_id=total_active_dr_cases');
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const record = data.results[0].record;

      for (const item of record) {
        if (item.column === 'total_active_dr_cases') {
          return parseInt(item.value);
        }
      }
    }
    return 0;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
}