import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { useCurrentPatient } from '@openmrs/esm-api';
import { getMedicationByUuid } from './medications.resource';
import SummaryCard from '../../ui-components/cards/summary-card.component';
import { formatDuration, getDosage } from './medication-orders-utils';
import styles from './medication-record.css';
import MedicationOrderBasket from './medication-order-basket.component';
import { openWorkspaceTab } from '../shared-utils';
import RecordDetails from '../../ui-components/cards/record-details-card.component';

export default function MedicationRecord(props: MedicationRecordProps) {
  const [patientMedication, setPatientMedication] = React.useState(null);
  const [isLoadingPatient, patient, patientUuid] = useCurrentPatient();
  const match = useRouteMatch();

  React.useEffect(() => {
    if (!isLoadingPatient && patient) {
      const abortController = new AbortController();
      getMedicationByUuid(abortController, match.params['medicationUuid']).then(
        response => setPatientMedication(response.data),
        createErrorHandler(),
      );
      return () => abortController.abort();
    }
  }, [isLoadingPatient, patient, match.params]);

  return (
    <div className={styles.medicationContainer}>
      {!!(patientMedication && Object.entries(patientMedication)) && (
        <div className={styles.medicationSummary}>
          <SummaryCard
            name="Medication"
            styles={{ width: '100%' }}
            editComponent={MedicationOrderBasket}
            showComponent={() =>
              openWorkspaceTab(MedicationOrderBasket, 'Edit Medication Order', {
                drugName: patientMedication?.drug?.display,
                orderUuid: patientMedication?.uuid,
                action: 'REVISE',
              })
            }>
            <div className={`omrs-type-body-regular ${styles.medicationCard}`}>
              <p className="omrs-type-title-3" style={{ color: 'var(--omrs-color-ink-medium-contrast)' }}>
                {patientMedication?.drug?.display}
              </p>
              <div className={styles.medicationSummaryLine}>
                <span
                  className="omrs-medium"
                  style={{
                    color: 'var(--omrs-color-ink-high-contrast)',
                  }}>
                  {patientMedication?.drug?.display}
                </span>{' '}
                &mdash; <span> {(patientMedication?.doseUnits?.display).toLowerCase()}</span> &mdash;{' '}
                <span>{(patientMedication?.route?.display).toLowerCase()}</span> &mdash;{' '}
                <span style={{ color: 'var(--omrs-color-ink-medium-contrast)' }}> DOSE</span>{' '}
                <span className="omrs-medium">
                  {getDosage(patientMedication?.drug?.strength, patientMedication?.dose).toLowerCase()}
                </span>{' '}
                &mdash; <span>{patientMedication?.frequency?.display}</span>
              </div>
              <table className={styles.medicationTable}>
                <tbody>
                  <tr>
                    <th>Start date</th>
                    <th>Substitutions permitted</th>
                  </tr>
                  <tr>
                    <td style={{ letterSpacing: '0.028rem' }}>
                      {patientMedication.dateActivated
                        ? dayjs(patientMedication?.dateActivated).format('dddd DD-MMM-YYYY')
                        : '—'}
                    </td>
                    <td>&mdash;</td>
                  </tr>
                  <tr>
                    <th>End date</th>
                    <th>Dosing instructions</th>
                  </tr>
                  <tr>
                    <td>
                      {patientMedication?.dateStopped
                        ? dayjs(patientMedication?.dateStopped).format('dddd DD-MMM-YYYY')
                        : '—'}
                    </td>
                    <td>{patientMedication?.dosingInstructions ? patientMedication.dosingInstructions : 'none'}</td>
                  </tr>
                  <tr>
                    <th>Duration</th>
                  </tr>
                  <tr>
                    <td>{formatDuration(patientMedication)}</td>
                  </tr>
                  <tr>
                    <th>Total number of refills</th>
                  </tr>
                  <tr>
                    <td>{patientMedication?.numRefills}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SummaryCard>
          <RecordDetails>
            <table className={styles.medicationDetailsTable}>
              <thead>
                <tr>
                  <th>Last updated</th>
                  <th>Last updated by</th>
                  <th>Last updated location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontFamily: 'Work Sans' }}>
                    {dayjs(patientMedication?.dateActivated).format('DD-MMM-YYYY')}
                  </td>
                  <td>{patientMedication?.orderer?.person?.display}</td>
                  <td>{`Location Test`}</td>
                </tr>
              </tbody>
            </table>
          </RecordDetails>
        </div>
      )}
    </div>
  );
}

type MedicationRecordProps = {};
