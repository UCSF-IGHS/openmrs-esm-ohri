import React from 'react';
import { fetchPatientMedications } from './medications.resource';
import { createErrorHandler } from '@openmrs/esm-error-handling';
import { useCurrentPatient } from '@openmrs/esm-api';
import { getDosage } from './medication-orders-utils';
import { openMedicationWorkspaceTab } from '../shared-utils';
import {
  OverflowMenu,
  OverflowMenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'carbon-components-react';

export default function MedicationsOverview() {
  const [patientMedications, setPatientMedications] = React.useState(null);
  const [, , patientUuid] = useCurrentPatient();

  React.useEffect(() => {
    if (patientUuid) {
      const subscription = fetchPatientMedications(patientUuid).subscribe(medications => {
        setPatientMedications(medications);
      }, createErrorHandler());
      return () => subscription.unsubscribe();
    }
  }, [patientUuid]);

  return (
    <>
      <h2>Active medications</h2>
      {patientMedications?.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Medication</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientMedications.map((medication, index) => (
              <TableRow key={index}>
                <TableCell>
                  {medication?.drug?.name} &mdash;
                  <span style={{ color: 'var(--omrs-color-ink-medium-contrast)' }}> DOSE</span> &mdash;{' '}
                  {getDosage(medication?.drug?.strength, medication?.dose).toLowerCase()} &mdash;{' '}
                  {medication?.doseUnits?.display.toLowerCase()} &mdash; {medication?.route?.display.toLowerCase()}{' '}
                  &mdash; {medication?.frequency?.display}
                </TableCell>
                <TableCell>
                  <OverflowMenu>
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
      ) : (
        <p>This patient has no active medications recorded in the system.</p>
      )}
    </>
  );
}
