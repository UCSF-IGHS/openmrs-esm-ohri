import MedicationOrderBasket from './medications/medication-order-basket.component';
import { openWorkspaceTab } from '@openmrs/esm-patient-chart-widgets';

export function openMedicationWorkspaceTab(orderUuid?: string, drugName?: string, action?: 'REVISE' | 'DISCONTINUE') {
  const params = {
    orderUuid,
    drugName,
    action,
  };
  openWorkspaceTab(MedicationOrderBasket, 'Medication Order Basket', params);
}
