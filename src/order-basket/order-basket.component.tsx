import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrderBasketSearch from './order-basket-search.component';
import {
  Button,
  // @ts-ignore
  ButtonSet,
  DataTableSkeleton,
  Loading,
} from 'carbon-components-react';
import MedicationOrderForm from './medication-order-form.component';
import { OrderBasketItem } from '../types/order-basket-item';
import { getDurationUnits, getPatientEncounterId } from '../api/api';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { OpenmrsResource } from '../types/openmrs-resource';
import { orderDrugs } from './drug-ordering';
import { useCurrentPatient } from '@openmrs/esm-api';
import OrderBasketItemList from './order-basket-item-list.component';
import styles from './order-basket.scss';
import { connect } from 'unistore/react';
import { OrderBasketStore, OrderBasketStoreActions, orderBasketStoreActions } from '../order-basket-store';
import { useHistory } from 'react-router-dom';
import { useCurrentPatientOrders } from '../utils/use-current-patient-orders';
import MedicationsDetailsTable from '../components/medications-details-table.component';

const OrderBasket = connect(
  'items',
  orderBasketStoreActions,
)(({ items, setItems }: OrderBasketStore & OrderBasketStoreActions) => {
  const { t } = useTranslation();
  const [, , patientUuid] = useCurrentPatient();
  const [durationUnits, setDurationUnits] = useState<Array<OpenmrsResource>>([]);
  const [encounterUuid, setEncounterUuid] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [medicationOrderFormItem, setMedicationOrderFormItem] = useState<OrderBasketItem | null>(null);
  const [isMedicationOrderFormVisible, setIsMedicationOrderFormVisible] = useState(false);
  const [onMedicationOrderFormSigned, setOnMedicationOrderFormSign] = useState<
    (finalizedOrderBasketItem: OrderBasketItem) => void | null
  >(null);
  const history = useHistory();
  const [activePatientOrders, fetchActivePatientOrders] = useCurrentPatientOrders('ACTIVE');

  useEffect(() => {
    const abortController = new AbortController();
    const durationUnitsRequest = getDurationUnits(abortController).then(
      res => setDurationUnits(res.data.answers),
      createErrorHandler,
    );
    const patientEncounterRequest = getPatientEncounterId(patientUuid, abortController).then(
      ({ data }) => setEncounterUuid(data.results[0].uuid),
      createErrorHandler,
    );

    Promise.all([durationUnitsRequest, patientEncounterRequest]).finally(() => setIsLoading(false));
    return () => abortController.abort();
  }, [patientUuid]);

  const handleSearchResultClicked = (searchResult: OrderBasketItem, directlyAddToBasket: boolean) => {
    if (directlyAddToBasket) {
      setItems([...items, searchResult]);
    } else {
      openMedicationOrderFormForAddingNewOrder(searchResult);
    }
  };

  const openMedicationOrderForm = (item: OrderBasketItem, onSigned: (finalizedOrder: OrderBasketItem) => void) => {
    setMedicationOrderFormItem(item);
    setOnMedicationOrderFormSign(_ => finalizedOrder => {
      setIsMedicationOrderFormVisible(false);
      setMedicationOrderFormItem(null);
      onSigned(finalizedOrder);
    });
    setIsMedicationOrderFormVisible(true);
  };

  const handleSaveClicked = () => {
    const abortController = new AbortController();
    orderDrugs(items, patientUuid, abortController).then(erroredItems => {
      setItems(erroredItems);
      fetchActivePatientOrders();

      if (erroredItems.length == 0) {
        history.push(`/patient/${patientUuid}/chart/orders`);
      }
    });
    return () => abortController.abort();
  };

  const handleCancelClicked = () => {
    setItems([]);
    history.push(`/patient/${patientUuid}/chart/orders`);
  };

  const openMedicationOrderFormForAddingNewOrder = (newOrderBasketItem: OrderBasketItem) => {
    openMedicationOrderForm(newOrderBasketItem, finalizedOrder => setItems([...items, finalizedOrder]));
  };

  const openMedicationOrderFormForUpdatingExistingOrder = (existingOrderIndex: number) => {
    const order = items[existingOrderIndex];
    openMedicationOrderForm(order, finalizedOrder =>
      setItems(() => {
        const newOrders = [...items];
        newOrders[existingOrderIndex] = finalizedOrder;
        return newOrders;
      }),
    );
  };

  return (
    <>
      <Loading active={isLoading} withOverlay={true} />
      {isMedicationOrderFormVisible ? (
        <MedicationOrderForm
          durationUnits={durationUnits}
          initialOrderBasketItem={medicationOrderFormItem}
          onSign={onMedicationOrderFormSigned}
          onCancel={() => setIsMedicationOrderFormVisible(false)}
        />
      ) : (
        <>
          <OrderBasketSearch encounterUuid={encounterUuid} onSearchResultClicked={handleSearchResultClicked} />

          <div className={styles.orderBasketContainer}>
            <OrderBasketItemList
              orderBasketItems={items}
              onItemClicked={order => openMedicationOrderFormForUpdatingExistingOrder(items.indexOf(order))}
              onItemRemoveClicked={order => {
                const newOrders = [...items];
                newOrders.splice(items.indexOf(order), 1);
                setItems(newOrders);
              }}
            />

            {activePatientOrders ? (
              <MedicationsDetailsTable
                title={t('activeMedications', 'Active Medications')}
                medications={activePatientOrders}
                showDiscontinueButton={true}
                showModifyButton={true}
                showReorderButton={false}
                showAddNewButton={false}
              />
            ) : (
              <DataTableSkeleton />
            )}

            <ButtonSet style={{ marginTop: '2rem' }}>
              <Button kind="secondary" onClick={handleCancelClicked}>
                {t('cancel', 'Cancel')}
              </Button>
              <Button kind="primary" onClick={handleSaveClicked}>
                {t('save', 'Save')}
              </Button>
            </ButtonSet>
          </div>
        </>
      )}
    </>
  );
});

export default OrderBasket;
