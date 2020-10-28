import { useEffect, useState } from 'react';
import { useCurrentPatient } from '@openmrs/esm-api';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { fetchPatientOrders } from '../api/api';
import { Order } from '../types/order';

/**
 * Fetches the orders belonging to the current patient and optional provides a way to trigger a re-fetch of that data
 * on demand.
 * @param status The status/the kind of orders to be fetched.
 */
export function useCurrentPatientOrders(
  status: 'ACTIVE' | 'any',
): [Array<Order> | null, (abortController?: AbortController) => Promise<unknown>] {
  const [, , patientUuid] = useCurrentPatient();
  const [orders, setOrders] = useState<Array<Order>>(null);
  const fetchOrders = (abortController?: AbortController) => {
    return fetchPatientOrders(patientUuid, status, abortController).then(orders => {
      setOrders(orders);
    }, createErrorHandler);
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchOrders(abortController);
    return () => abortController.abort();
  }, [patientUuid]);

  return [orders, fetchOrders];
}
