import React from 'react';
import useSWR from 'swr';
import { FhirPatientResponse, PatientListRow } from '../api/types';
import { ConfigurableLink, openmrsFetch } from '@openmrs/esm-framework';
import moment from 'moment';
import capitalize from 'lodash/capitalize';
import { OverflowMenu } from '@carbon/react';
import { AddPatientToListOverflowMenuItem } from '../components/modals/add-patient-to-list-modal.component';

export function usePatientList(offSet: number = 0, pageSize: number = 15) {
  const { data, error, isLoading } = useSWR<{ data: FhirPatientResponse }, Error>(
    `/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}&_summary=data`,
    openmrsFetch,
  );

  let patientListRows: PatientListRow[] = [];
  if (data) {
    data.data?.entry?.map((patient) => {
      const patientName = patient.resource.name[0].given.join(' ') + ' ' + patient.resource.name[0].family;
      const getPatientLink = () => {
        return (
          <ConfigurableLink
            to={`/openmrs/spa/patient/${patient.resource.id}/chart`}
            style={{ textDecoration: 'inherit' }}>
            {patientName}
          </ConfigurableLink>
        );
      };

      const patientActions = (
        <OverflowMenu flipped>
          <AddPatientToListOverflowMenuItem patientUuid={patient.resource.id} excludeCohorts={[]} />
        </OverflowMenu>
      );

      const patientListRow: PatientListRow = {
        id: patient.resource.id,
        name: patientName,
        patientLink: getPatientLink(),
        gender: capitalize(patient.resource.gender),
        birthDate: patient.resource.birthDate,
        age: moment().diff(patient.resource.birthDate, 'years') + ' years',
        actions: patientActions,
      };
      patientListRows.push(patientListRow);
    });
  }

  return {
    patients: patientListRows,
    error,
    isLoading,
    total: data?.data.total || 0,
  };
}
