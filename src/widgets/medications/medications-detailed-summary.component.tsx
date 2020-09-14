import React from 'react';
import { match, Route, Link, useRouteMatch } from 'react-router-dom';
import SummaryCard from '../../ui-components/cards/summary-card.component';
import styles from './medications-detailed-summary.css';
import dayjs from 'dayjs';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { useCurrentPatient } from '@openmrs/esm-api';
import { useTranslation } from 'react-i18next';
import { formatDuration, getDosage } from './medication-orders-utils';
import { fetchPatientMedications, fetchPatientPastMedications, PatientMedications } from './medications.resource';
import { MedicationButton } from './medication-button.component';
import MedicationOrderBasket from './medication-order-basket.component';
import { openWorkspaceTab } from '../shared-utils';
import { isEmpty } from 'lodash-es';
import { toOmrsDateString } from '../../utils/omrs-dates';

export default function MedicationsDetailedSummary(props: MedicationsDetailedSummaryProps) {
  const [currentMedications, setCurrentMedications] = React.useState(null);
  const [pastMedications, setPastMedications] = React.useState(null);
  const [isLoadingPatient, patient, patientUuid, patientErr] = useCurrentPatient();

  const { t } = useTranslation();
  const match = useRouteMatch<any>();

  React.useEffect(() => {
    if (patientUuid) {
      const sub = fetchPatientMedications(patientUuid).subscribe(medications => {
        setCurrentMedications(medications);
      }, createErrorHandler());
      const sub2 = fetchPatientPastMedications(patientUuid, 'any').subscribe(medications => {
        setPastMedications(
          medications
            .sort((a: PatientMedications, b: PatientMedications) => {
              return new Date(b.dateActivated).getDate() - new Date(a.dateActivated).getDate();
            })
            .filter((med: PatientMedications) => {
              return toOmrsDateString(new Date()) >= toOmrsDateString(med.autoExpireDate) || !isEmpty(med.dateStopped);
            }),
        );
      });
      return () => sub.unsubscribe && sub2.unsubscribe();
    }
  }, [patientUuid]);

  function displayCurrentMedications() {
    return (
      <React.Fragment>
        <SummaryCard
          name={t('Medications - current', 'Medications - current')}
          addComponent={MedicationOrderBasket}
          showComponent={() =>
            openWorkspaceTab(MedicationOrderBasket, 'Medication Order', {
              action: 'NEW',
            })
          }>
          <table className={styles.medicationsTable}>
            <thead>
              <tr>
                <td>NAME</td>
                <td className={styles.centerItems}>STATUS</td>
                <td className={styles.dateLabel}>START DATE</td>
                <td>ACTIONS</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentMedications &&
                currentMedications.map(medication => {
                  return (
                    <React.Fragment key={medication.uuid}>
                      <tr>
                        <td>
                          <span
                            style={{
                              fontWeight: 500,
                              color: 'var(--omrs-color-ink-high-contrast)',
                            }}>
                            {medication?.drug?.name}
                          </span>{' '}
                          &mdash; {(medication?.route?.display).toLowerCase()} &mdash;{' '}
                          {medication?.doseUnits?.display.toLowerCase()} &mdash;{' '}
                          <span
                            style={{
                              color: 'var(--omrs-color-ink-medium-contrast)',
                            }}>
                            DOSE
                          </span>{' '}
                          <span
                            style={{
                              fontWeight: 500,
                              color: 'var(--omrs-color-ink-high-contrast)',
                            }}>
                            {getDosage(medication?.drug?.strength, medication?.dose)}
                          </span>
                          <span>
                            {' '}
                            &mdash; {medication?.frequency?.display} &mdash; {formatDuration(medication)} &mdash;
                          </span>{' '}
                          <span
                            style={{
                              color: 'var(--omrs-color-ink-medium-contrast)',
                            }}>
                            REFILLS
                          </span>{' '}
                          <span>{medication.numRefills}</span>{' '}
                        </td>
                        <td>{medication.action}</td>
                        <td className="omrs-type-body-regular" style={{ fontFamily: 'Work Sans' }}>
                          {dayjs(medication.dateActivated).format('DD-MMM-YYYY')}
                        </td>
                        <td>
                          <MedicationButton
                            component={MedicationOrderBasket}
                            name={'Medication Order Basket'}
                            label={'Revise'}
                            orderUuid={medication.uuid}
                            drugName={medication.drug.name}
                            action={'REVISE'}
                            inProgress={true}
                            btnClass="omrs-btn omrs-text-action"
                          />
                          <MedicationButton
                            component={MedicationOrderBasket}
                            name={'Medication Order Basket'}
                            label={'Discontinue'}
                            orderUuid={medication.uuid}
                            drugName={null}
                            action={'DISCONTINUE'}
                            inProgress={true}
                            btnClass="omrs-btn omrs-text-destructive"
                          />
                        </td>
                        <td style={{ textAlign: 'end' }}>
                          <Link
                            to={`/drugorder/patient/${match.params.patientUuid}/medication-orders/${medication.uuid}`}>
                            <svg className="omrs-icon" fill="rgba(60, 60, 67, 0.3)">
                              <use xlinkHref="#omrs-icon-chevron-right" />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>
        </SummaryCard>
      </React.Fragment>
    );
  }

  function displayPastMedications() {
    return (
      <>
        <React.Fragment>
          <SummaryCard
            name={t('Medications - past', 'Medications - past')}
            addComponent={MedicationOrderBasket}
            showComponent={() =>
              openWorkspaceTab(MedicationOrderBasket, 'Medication Order', {
                action: 'NEW',
              })
            }>
            <table className={styles.medicationsTable}>
              <thead>
                <tr>
                  <td>STATUS</td>
                  <td>NAME</td>
                  <td className={styles.dateLabel}>END DATE</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {pastMedications &&
                  pastMedications.map(medication => {
                    return (
                      <React.Fragment key={medication.uuid}>
                        <tr>
                          <td className={styles.pastMedStatus}>{medication.action}</td>
                          <td>
                            <span
                              style={{
                                fontWeight: 500,
                                color: 'var(--omrs-color-ink-high-contrast)',
                              }}>
                              {medication?.drug?.name}
                            </span>{' '}
                            &mdash; {medication?.doseUnits?.display} &mdash;{' '}
                            {(medication?.route?.display).toLowerCase()} &mdash;{' '}
                            <span
                              style={{
                                color: 'var(--omrs-color-ink-medium-contrast)',
                              }}>
                              DOSE
                            </span>{' '}
                            <span
                              style={{
                                fontWeight: 500,
                                color: 'var(--omrs-color-ink-high-contrast)',
                              }}>
                              {getDosage(medication?.drug?.strength, medication?.dose)}
                            </span>
                            <span>
                              {' '}
                              &mdash; {medication?.frequency?.display} &mdash; {formatDuration(medication)}
                            </span>{' '}
                            <span
                              style={{
                                color: 'var(--omrs-color-ink-medium-contrast)',
                              }}>
                              REFILLS
                            </span>{' '}
                            <span>{medication.numRefills}</span>
                          </td>
                          <td className="omrs-type-body-regular" style={{ fontFamily: 'Work Sans' }}>
                            {dayjs(medication.dateStopped ? medication.dateStopped : medication.autoExpireDate).format(
                              'DD-MMM-YYYY',
                            )}
                          </td>
                          <td style={{ textAlign: 'end' }}>
                            <Link
                              to={`/drugorder/patient/${match.params.patientUuid}/medication-orders/${medication.uuid}`}>
                              <svg className="omrs-icon" fill="rgba(60, 60, 67, 0.3)">
                                <use xlinkHref="#omrs-icon-chevron-right" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </SummaryCard>
        </React.Fragment>
      </>
    );
  }

  function displayMedications() {
    return (
      <>
        <div>
          {currentMedications && currentMedications.length > 0 ? (
            displayCurrentMedications()
          ) : (
            <SummaryCard
              name={t('Medications - current', 'Medications - current')}
              styles={{ width: '100%' }}
              addComponent={MedicationOrderBasket}
              showComponent={() =>
                openWorkspaceTab(MedicationOrderBasket, 'Medication Order', {
                  action: 'NEW',
                })
              }>
              <div className={styles.emptyMedications}>
                <p className="omrs-bold">No current medications are documented.</p>
              </div>
            </SummaryCard>
          )}
        </div>
        <div>
          {pastMedications && pastMedications.length > 0 ? (
            displayPastMedications()
          ) : (
            <SummaryCard
              name={t('Medications - past', 'Medications - past')}
              styles={{ width: '100%' }}
              addComponent={MedicationOrderBasket}
              showComponent={() =>
                openWorkspaceTab(MedicationOrderBasket, 'Medication Order', {
                  action: 'NEW',
                })
              }>
              <div className={styles.emptyMedications}>
                <p className="omrs-bold">No past medications are documented.</p>
              </div>
            </SummaryCard>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {(currentMedications || pastMedications) && (
        <div className={styles.medicationsSummary}>
          {!isEmpty(currentMedications) || !isEmpty(pastMedications) ? (
            displayMedications()
          ) : (
            <SummaryCard name="Medications" styles={{ width: '100%' }}>
              <div className={styles.emptyMedications}>
                <p className="omrs-bold">This patient has no medication orders in the system.</p>
                <p className="omrs-bold">
                  <button
                    className="omrs-btn omrs-outlined-action"
                    onClick={() =>
                      openWorkspaceTab(MedicationOrderBasket, 'Medication Order', {
                        action: 'NEW',
                      })
                    }>
                    Add medication order
                  </button>
                </p>
              </div>
            </SummaryCard>
          )}
        </div>
      )}
    </>
  );
}

type MedicationsDetailedSummaryProps = {};
