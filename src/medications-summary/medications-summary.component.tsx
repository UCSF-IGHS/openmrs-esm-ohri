import React from 'react';
import { useTranslation } from 'react-i18next';
import FloatingOrderBasketButton from './floating-order-basket-button.component';
import styles from './medications-summary.scss';
import MedicationsDetailsTable from '../components/medications-details-table.component';
import { DataTableSkeleton } from 'carbon-components-react';
import { useCurrentPatientOrders } from '../utils/use-current-patient-orders';

export default function MedicationsSummary() {
  const { t } = useTranslation();
  const [activePatientOrders] = useCurrentPatientOrders('ACTIVE');
  const [pastPatientOrders] = useCurrentPatientOrders('any');

  return (
    <>
      <h1 className={styles.productiveHeading03}>{t('medications', 'Medications')}</h1>
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
      <div style={{ marginTop: '3rem' }}>
        {pastPatientOrders ? (
          <MedicationsDetailsTable
            title={t('pastMedications', 'Past Medications')}
            medications={pastPatientOrders}
            showDiscontinueButton={false}
            showModifyButton={false}
            showReorderButton={true}
            showAddNewButton={false}
          />
        ) : (
          <DataTableSkeleton />
        )}
      </div>
      <FloatingOrderBasketButton />
    </>
  );
}
