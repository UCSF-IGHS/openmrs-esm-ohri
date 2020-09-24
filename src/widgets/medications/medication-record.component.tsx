import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import dayjs from 'dayjs';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { useCurrentPatient } from '@openmrs/esm-api';
import { getMedicationByUuid } from './medications.resource';
import { formatDuration, getDosage } from './medication-orders-utils';
import styles from './medication-record.css';
import { Column, FormGroup, Grid, Row } from 'carbon-components-react';

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
        <>
          <h2>Medication details</h2>
          <Grid>
            <Row>
              <Column sm={{ span: 4 }}>
                <FormGroup legendText="Medication">
                  {patientMedication?.drug?.display} &mdash; {(patientMedication?.doseUnits?.display).toLowerCase()}{' '}
                  &mdash; {(patientMedication?.route?.display).toLowerCase()}&mdash; DOSE{' '}
                  {getDosage(patientMedication?.drug?.strength, patientMedication?.dose).toLowerCase()} &mdash;
                  {patientMedication?.frequency?.display}
                </FormGroup>
              </Column>
            </Row>
            <Row>
              <Column>
                <FormGroup legendText="Start date">
                  {patientMedication.dateActivated
                    ? dayjs(patientMedication?.dateActivated).format('dddd DD-MMM-YYYY')
                    : '—'}
                </FormGroup>
              </Column>
              <Column>
                <FormGroup legendText="End date">
                  {patientMedication?.dateStopped
                    ? dayjs(patientMedication?.dateStopped).format('dddd DD-MMM-YYYY')
                    : '—'}
                </FormGroup>
              </Column>
              <Column>
                <FormGroup legendText="Duration">{formatDuration(patientMedication)}</FormGroup>
              </Column>
              <Column>
                <FormGroup legendText="Total number of refills">{patientMedication?.numRefills}</FormGroup>
              </Column>
            </Row>
            <Row>
              <Column>
                <FormGroup legendText="Last updated">
                  {dayjs(patientMedication?.dateActivated).format('DD-MMM-YYYY')}
                </FormGroup>
              </Column>
              <Column>
                <FormGroup legendText="Last updated by">{patientMedication?.orderer?.person?.display}</FormGroup>
              </Column>
              <Column>
                <FormGroup legendText="Last updated location">Location Test</FormGroup>
              </Column>
              <Column>
                <FormGroup legendText="Substitutions permitted">—</FormGroup>
              </Column>
            </Row>
            <Row>
              <Column sm={{ span: 4 }}>
                <FormGroup legendText="Dosing instructions">
                  {patientMedication?.dosingInstructions ? patientMedication.dosingInstructions : 'None'}
                </FormGroup>
              </Column>
            </Row>
          </Grid>
        </>
      )}
    </div>
  );
}

type MedicationRecordProps = {};
