import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { useCurrentPatient } from '@openmrs/esm-api';
import { getMedicationByUuid } from './medications.resource';
import { formatDuration, getDosage } from './medication-orders-utils';
import styles from './medication-record.css';
import { Column, FormGroup, Grid, Row } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';

export default function MedicationRecord() {
  const [patientMedication, setPatientMedication] = React.useState(null);
  const [isLoadingPatient, patient] = useCurrentPatient();
  const match = useRouteMatch();
  const { t } = useTranslation();

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
        <>
          <h2>{t('details', 'Details')}</h2>
          <Grid>
            <Row>
              <Column sm={{ span: 4 }}>
                <FormGroup legendText={t('medication', 'Medication')}>
                  {patientMedication?.drug?.display} &mdash; {(patientMedication?.doseUnits?.display).toLowerCase()}{' '}
                  &mdash; {(patientMedication?.route?.display).toLowerCase()}&mdash; {t('dose', 'Dose')}{' '}
                  {getDosage(patientMedication?.drug?.strength, patientMedication?.dose).toLowerCase()} &mdash;
                  {patientMedication?.frequency?.display}
                </FormGroup>
              </Column>
            </Row>
            <Row>
              <Column>
                <FormGroup legendText={t('startDate', 'Start date')}>
                  {patientMedication.dateActivated
                    ? dayjs(patientMedication?.dateActivated).format('dddd DD-MMM-YYYY')
                    : '—'}
                </FormGroup>
              </Column>
              <Column>
                <FormGroup legendText={t('endDate', 'End date')}>
                  {patientMedication?.dateStopped
                    ? dayjs(patientMedication?.dateStopped).format('dddd DD-MMM-YYYY')
                    : '—'}
                </FormGroup>
              </Column>
              <Column>
                <FormGroup legendText={t('duration', 'Duration')}>{formatDuration(patientMedication)}</FormGroup>
              </Column>
              <Column>
                <FormGroup legendText={t('totalRefills', 'Total number of refills')}>
                  {patientMedication?.numRefills}
                </FormGroup>
              </Column>
            </Row>
            <Row>
              <Column>
                <FormGroup legendText={t('lastUpdated', 'Last updated')}>
                  {dayjs(patientMedication?.dateActivated).format('DD-MMM-YYYY')}
                </FormGroup>
              </Column>
              <Column>
                <FormGroup legendText={t('lastUpdatedBy', 'Last updated by')}>
                  {patientMedication?.orderer?.person?.display}
                </FormGroup>
              </Column>
              <Column>
                <FormGroup legendText={t('lastUpdatedLocation', 'Last updated location')}>Location Test</FormGroup>
              </Column>
              <Column>
                <FormGroup legendText={t('substitutionsPermitted', 'Substitutions permitted')}>—</FormGroup>
              </Column>
            </Row>
            <Row>
              <Column sm={{ span: 4 }}>
                <FormGroup legendText={t('dosingInstructions', 'Dosing instructions')}>
                  {patientMedication?.dosingInstructions ? patientMedication.dosingInstructions : t('none', 'None')}
                </FormGroup>
              </Column>
            </Row>
          </Grid>
        </>
      )}
    </div>
  );
}
