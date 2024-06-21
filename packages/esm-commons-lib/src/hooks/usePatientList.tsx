import React, { useEffect, useState } from 'react';
import useSWRImmutable from 'swr';
import { type FhirPatientResponse } from '../types';
import { ConfigurableLink, openmrsFetch } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import capitalize from 'lodash/capitalize';
import { OverflowMenu } from '@carbon/react';
import { AddPatientToListOverflowMenuItem } from '../components/modals/add-patient-to-list-modal.component';

export function usePatientList(offSet: number, pageSize: number, searchTerm?: string) {
  const url = `/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}${
    searchTerm ? `&name=${searchTerm}` : ''
  }&_summary=data`;
  const [paginatedPatientRows, setPaginatedPatientRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { data, error, isLoading } = useSWRImmutable<{ data: FhirPatientResponse }, Error>(url, openmrsFetch);

  useEffect(() => {
    if (data) {
      const patientRows = data.data?.entry?.map((patient) => {
        const patientName = patient.resource.name[0].given.join(' ') + ' ' + patient.resource.name[0].family;
        const getPatientLink = () => {
          return (
            <ConfigurableLink
              to={`/openmrs/spa/patient/${patient.resource.id}/chart`}
              style={{ textDecoration: 'inherit' }}
            >
              {patientName}
            </ConfigurableLink>
          );
        };
        const patientActions = (
          <OverflowMenu flipped>
            <AddPatientToListOverflowMenuItem
              patientUuid={patient.resource.id}
              excludeCohorts={['Post-Test Counselling']}
            />
          </OverflowMenu>
        );
        return {
          id: patient.resource.id,
          name: patientName,
          patientLink: getPatientLink(),
          gender: capitalize(patient.resource.gender),
          birthDate: patient.resource.birthDate,
          age: dayjs().diff(dayjs(patient.resource.birthDate), 'year') + ' years',
          actions: patientActions,
        };
      });
      setTotalCount(data?.data.total);
      setPaginatedPatientRows(patientRows);
    }
  }, [data]);

  return {
    patients: paginatedPatientRows,
    error,
    isLoading: isLoading || !data,
    total: totalCount,
  };
}
