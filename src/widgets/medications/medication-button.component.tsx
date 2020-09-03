import React from 'react';
import MedicationOrderBasket from './medication-order-basket.component';
import { openWorkspaceTab } from '../shared-utils';

export function MedicationButton(props: any) {
  return (
    <button
      className={props.btnClass ? props.btnClass : 'omrs-btn omrs-text-neutral'}
      onClick={() => {
        const params = {
          orderUuid: props.orderUuid,
          drugName: props.drugName,
          action: props.action,
        };
        openWorkspaceTab(MedicationOrderBasket, 'Medication Order Basket', params);
      }}>
      {props.label}
    </button>
  );
}
