import React, { useState, useEffect } from 'react';
import styles from './medication-order-basket.css';
import { debounce } from 'lodash';
import { getDrugByName, saveNewDrugOrder, getPatientDrugOrderDetails } from './medications.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import MedicationOrder from './medication-order.component';
import { OrderMedication } from './medication-orders-utils';
import { match } from 'react-router-dom';
import { DataCaptureComponentProps } from '@openmrs/esm-patient-chart-widgets';
import { useTranslation } from 'react-i18next';
import { toOmrsDateString } from '../../utils/omrs-dates';
import {
  Button,
  // @ts-ignore
  ButtonSet,
  OverflowMenu,
  OverflowMenuItem,
  Search,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react';

const DISCONTINUE_MEDICATION_ACTION: string = 'DISCONTINUE';

export default function MedicationOrderBasket(props: MedicationOrderBasketProps) {
  const searchTimeOut = 300;
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBasket, setOrderBasket] = useState([]);
  const [drugName, setDrugName] = useState<string>();
  const [showOrderMedication, setShowOrderMedication] = useState(false);
  const [enableButtons, setEnableButtons] = useState(false);
  const [editProperty, setEditProperty] = useState([]);
  const [editOrderItem, setEditOrderItem] = React.useState<{
    orderEdit: Boolean;
    order?: OrderMedication;
  }>({ orderEdit: false, order: null });
  const [hasChanged, setHasChanged] = useState<Boolean>(false);
  const { t } = useTranslation();
  const handleDrugSelected = uuid => {
    setDrugName(searchTerm);
    setShowOrderMedication(true);
  };

  const handleChange = debounce(searchterm => {
    setSearchTerm(searchterm);
  }, searchTimeOut);

  useEffect(() => {
    const abortController = new AbortController();
    if (searchTerm && searchTerm.length >= 3) {
      getDrugByName(searchTerm, abortController).then(
        response => setSearchResults(response.data.results),
        createErrorHandler,
      );
    } else {
      setSearchResults([]);
    }
    return () => abortController.abort();
  }, [searchTerm]);

  useEffect(() => {
    if (orderBasket.length > 0) {
      setEnableButtons(true);
    } else {
      setEnableButtons(false);
    }
  }, [orderBasket]);

  useEffect(() => {
    let params: any = props.match.params;
    if (params.drugName) {
      setShowOrderMedication(true);
      setEditProperty([
        {
          DrugName: params.drugName,
          Action: params.action,
          OrderUuid: params.orderUuid,
        },
      ]);
      setDrugName(params.drugName);
    }
  }, [props.match.params]);

  useEffect(() => {
    let params: any = props.match.params;
    const DISCONTINUE = 'DISCONTINUE';
    if (params.action != undefined && params.action === DISCONTINUE) {
      const abortController = new AbortController();
      getPatientDrugOrderDetails(abortController, params.orderUuid).then(({ data }) => {
        let previousOrder: { previousOrder: string };
        if (data.action === 'REVISE') {
          previousOrder = null;
        } else {
          previousOrder = data.previousOrder ? data.previousOrder : data.uuid;
        }
        setOrderBasket([
          ...orderBasket,
          {
            orderUuid: data.uuid,
            encounterUuid: data.encounter.uuid,
            patientUuid: data.patient.uuid,
            type: 'drugorder',
            orderer: data.orderer.uuid,
            careSetting: data.careSetting.uuid,
            dose: data.dose,
            drugStrength: data.drug.strength,
            drugName: data.drug.name,
            frequencyName: data.frequency.display,
            dosageForm: data.doseUnits.display,
            routeName: data.route.display,
            action: DISCONTINUE_MEDICATION_ACTION,
            concept: data.concept.uuid,
            doseUnitsConcept: data.doseUnits.uuid,
            previousOrder,
            drugUuid: data.drug.uuid,
            dateActivated: toOmrsDateString(data.dateActivated),
          },
        ]);
      });
      return () => abortController.abort();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params]);

  const handleSaveOrders = () => {
    const abortController = new AbortController();
    orderBasket.forEach(order => {
      saveNewDrugOrder(abortController, order).then(response => {
        if (response.status === 201) {
          setOrderBasket([]);
          props.closeComponent();
        }
      }, createErrorHandler());
    });
    return () => abortController.abort();
  };

  const hideModal = () => {
    setShowOrderMedication(false);
    setEditProperty([]);
    setEditOrderItem({ orderEdit: false, order: null });
  };

  const resetParams = () => {
    props.match.params = {};
  };

  const handleRemoveOrderItem = (indexNum: any) => {
    setOrderBasket(orderBasket.filter((order: OrderMedication, index) => index !== indexNum));
  };

  const handleOrderItemEdit = (orderItem: OrderMedication, indexNum: any) => {
    setEditOrderItem({ orderEdit: true, order: orderItem });
    setShowOrderMedication(true);
    setEditProperty([]);
    setOrderBasket(orderBasket.filter((order: OrderMedication, index) => index !== indexNum));
  };

  const closeForm = () => {
    let userConfirmed: boolean = false;
    if (hasChanged) {
      userConfirmed = confirm(
        t('ongoingWorkPrompt', 'There is ongoing work, are you sure you want to close this tab?'),
      );
    }

    if (userConfirmed && hasChanged) {
      props.entryCancelled();
      props.closeComponent();
    } else if (!hasChanged) {
      props.entryCancelled();
      props.closeComponent();
    }
  };

  return (
    <div className={styles.medicationOrderBasketContainer}>
      <div>
        <h2>{t('orderMedication', 'Order Medication')}</h2>
        <Search
          labelText={t('medicationName', 'Medication name')}
          placeHolderText={t('medicationName', 'Medication name')}
          onChange={e => {
            handleChange(e.target.value);
            setHasChanged(true);
          }}
        />
      </div>

      <div>
        {searchResults?.length > 0 ? (
          <>
            <h4>{t('searchResultsForTerm', 'Results for {searchTerm}', { searchTerm })}</h4>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>{t('numeroSign', 'No.')}</TableHeader>
                  <TableHeader>{t('drugName', 'Drug Name')}</TableHeader>
                  <TableHeader>{t('strength', 'Strength')}</TableHeader>
                  <TableHeader>{t('dosageForm', 'Dosage Form')}</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow key={result.uuid} onClick={() => handleDrugSelected(result.uuid)}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.strength}</TableCell>
                    <TableCell>{result.dosageForm.display}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <p>
            {t(
              'emptyMedicationOrderBaskedSearchHint',
              'You can add items to your basket by searching for them in the search field above.',
            )}
          </p>
        )}
      </div>

      <div>
        <h4>Order basket</h4>
        {orderBasket?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{t('numeroSign', 'No.')}</TableHeader>
                <TableHeader>{t('drugName', 'Drug Name')}</TableHeader>
                <TableHeader>{t('strength', 'Strength')}</TableHeader>
                <TableHeader>{t('dosageForm', 'Dosage Form')}</TableHeader>
                <TableHeader>{t('frequency', 'Frequency')}</TableHeader>
                <TableHeader>{t('actions', 'Actions')}</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderBasket.map((order, index) => (
                <TableRow key={order.drugUuid}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.drugName}</TableCell>
                  <TableCell>{order.drugStrength}</TableCell>
                  <TableCell>{order.dosageForm}</TableCell>
                  <TableCell>{order.frequencyName}</TableCell>
                  <TableCell>
                    <OverflowMenu>
                      <OverflowMenuItem
                        itemText={t('edit', 'Edit')}
                        onClick={() => handleOrderItemEdit(order, index)}
                      />
                      <OverflowMenuItem
                        itemText={t('remove', 'Remove')}
                        isDelete={true}
                        onClick={() => handleRemoveOrderItem(index)}
                      />
                    </OverflowMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>{t('emptyMedicationOrderBasket', 'Your basket is currently empty.')}</p>
        )}
      </div>

      {showOrderMedication && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <MedicationOrder
              drugName={drugName}
              setOrderBasket={setOrderBasket}
              orderBasket={orderBasket}
              hideModal={hideModal}
              editProperty={editProperty}
              resetParams={resetParams}
              orderEdit={editOrderItem}
            />
          </div>
        </div>
      )}

      <div>
        <ButtonSet>
          <Button kind="secondary" onClick={closeForm}>
            {t('close', 'Close')}
          </Button>
          <Button kind="primary" disabled={!enableButtons} onClick={handleSaveOrders}>
            {t('sign', 'Sign')}
          </Button>
        </ButtonSet>
      </div>
    </div>
  );
}

MedicationOrderBasket.defaultProps = {
  entryStarted: () => {},
  entryCancelled: () => {},
  entrySubmitted: () => {},
  closeComponent: () => {},
};

type MedicationOrderBasketProps = DataCaptureComponentProps & {
  match: match;
};
