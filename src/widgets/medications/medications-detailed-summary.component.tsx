import React from 'react';
import dayjs from 'dayjs';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { useCurrentPatient } from '@openmrs/esm-api';
import { formatDuration, getDosage } from './medication-orders-utils';
import { fetchPatientMedications, fetchPatientPastMedications, PatientMedications } from './medications.resource';
import MedicationOrderBasket from './medication-order-basket.component';
import { openMedicationWorkspaceTab } from '../shared-utils';
import { openWorkspaceTab } from '@openmrs/esm-patient-chart-widgets';
import { isEmpty } from 'lodash-es';
import { toOmrsDateString } from '../../utils/omrs-dates';
import {
  Button,
  OverflowMenu,
  OverflowMenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableToolbar,
  TableToolbarContent,
} from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import { useHistory, useRouteMatch } from 'react-router-dom';

export default function MedicationsDetailedSummary() {
  const [currentMedications, setCurrentMedications] = React.useState(null);
  const [pastMedications, setPastMedications] = React.useState(null);
  const [, , patientUuid] = useCurrentPatient();
  const history = useHistory();
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

  return (
    <>
      <h2>Current medications</h2>
      <TableContainer>
        <TableToolbar>
          <TableToolbarContent>
            <Button
              renderIcon={() => <Add16 />}
              onClick={() => openWorkspaceTab(MedicationOrderBasket, 'Medication Order', { action: 'NEW' })}>
              Add
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medication</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentMedications?.length > 0 &&
              currentMedications.map((medication, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {medication?.drug?.name} &mdash;
                    <span style={{ color: 'var(--omrs-color-ink-medium-contrast)' }}> DOSE</span> &mdash;{' '}
                    {getDosage(medication?.drug?.strength, medication?.dose).toLowerCase()} &mdash;{' '}
                    {medication?.doseUnits?.display.toLowerCase()} &mdash; {medication?.route?.display.toLowerCase()}{' '}
                    &mdash; {medication?.frequency?.display} &mdash; {formatDuration(medication)} &mdash;
                    <span style={{ color: 'var(--omrs-color-ink-medium-contrast)' }}>REFILLS</span>{' '}
                    <span>{medication.numRefills}</span>{' '}
                  </TableCell>
                  <TableCell>{medication?.action}</TableCell>
                  <TableCell>{dayjs(medication.dateActivated).format('DD-MMM-YYYY')}</TableCell>
                  <TableCell>
                    <OverflowMenu>
                      <OverflowMenuItem
                        itemText="View details"
                        onClick={() =>
                          history.push(
                            `/patient/${match.params.patientUuid}/chart/orders/medication-orders/${medication.uuid}`,
                          )
                        }
                      />
                      <OverflowMenuItem
                        itemText="Revise"
                        onClick={() => openMedicationWorkspaceTab(medication?.uuid, medication?.drug?.name, 'REVISE')}
                      />
                      <OverflowMenuItem
                        itemText="Discontinue"
                        isDelete
                        onClick={() =>
                          openMedicationWorkspaceTab(medication?.uuid, medication?.drug?.name, 'DISCONTINUE')
                        }
                      />
                    </OverflowMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!currentMedications || currentMedications.length === 0) && (
        <p>There are no current medications recorded for this patient.</p>
      )}

      <h2>Past medications</h2>
      <TableContainer>
        <TableToolbar>
          <TableToolbarContent>
            <Button
              renderIcon={() => <Add16 />}
              onClick={() => openWorkspaceTab(MedicationOrderBasket, 'Medication Order', { action: 'NEW' })}>
              Add
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Medication</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastMedications?.length > 0 &&
              pastMedications.map((medication, index) => (
                <TableRow key={index}>
                  <TableCell>{medication?.action}</TableCell>
                  <TableCell>
                    {medication?.drug?.name} &mdash;
                    <span style={{ color: 'var(--omrs-color-ink-medium-contrast)' }}> DOSE</span> &mdash;{' '}
                    {getDosage(medication?.drug?.strength, medication?.dose).toLowerCase()} &mdash;{' '}
                    {medication?.doseUnits?.display.toLowerCase()} &mdash; {medication?.route?.display.toLowerCase()}{' '}
                    &mdash; {medication?.frequency?.display} &mdash; {formatDuration(medication)} &mdash;
                    <span style={{ color: 'var(--omrs-color-ink-medium-contrast)' }}>REFILLS</span>{' '}
                    <span>{medication.numRefills}</span>{' '}
                  </TableCell>
                  <TableCell>
                    {dayjs(medication.dateStopped ? medication.dateStopped : medication.autoExpireDate).format(
                      'DD-MMM-YYYY',
                    )}
                  </TableCell>
                  <TableCell>
                    <OverflowMenu>
                      <OverflowMenuItem
                        itemText="View details"
                        onClick={() =>
                          history.push(
                            `/patient/${match.params.patientUuid}/chart/orders/medication-orders/${medication.uuid}`,
                          )
                        }
                      />
                    </OverflowMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(!pastMedications || pastMedications.length === 0) && (
        <p>There are no past medications recorded for this patient.</p>
      )}
    </>
  );
}
