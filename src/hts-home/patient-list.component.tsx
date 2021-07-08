import { age, ExtensionSlot, openmrsFetch } from '@openmrs/esm-framework';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton/DataTableSkeleton';
import { capitalize } from 'lodash';
import React, { useEffect, useState } from 'react';
import EmptyState from '../components/empty-state/empty-state.component';

const TestPatientList: React.FC<{ cohortId?: string }> = () => {
  const [patients, setPatients] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadPatients();
    setColumns([
      {
        key: 'name',
        header: 'Name',
        getValue: patient => {
          return `${patient.name[0].given.join(' ')} ${patient.name[0].family}`;
        },
      },
      {
        key: 'gender',
        header: 'Sex',
        getValue: patient => {
          return capitalize(patient.gender);
        },
      },
      {
        key: 'age',
        header: 'Age',
        getValue: patient => {
          return age(patient.birthDate);
        },
      },
      {
        key: 'lastVisit',
        header: 'Last Visit',
        getValue: patient => {
          return 'TODO';
        },
      },
      {
        key: 'id',
        header: 'Patient ID',
        getValue: patient => {
          return patient.identifier[0].value;
        },
      },
    ]);
  }, []);

  function loadPatients() {
    return openmrsFetch('/ws/fhir2/R4/Patient').then(({ data }) => {
      setPatients(data.entry.map(pat => pat.resource));
      setIsLoading(false);
    });
  }

  return (
    <div>
      {patients.length ? (
        <ExtensionSlot
          extensionSlotName="patient-table-slot"
          state={{
            patients: patients,
            columns: columns,
          }}
        />
      ) : isLoading ? (
        <DataTableSkeleton rowCount={10} />
      ) : (
        <EmptyState headerTitle="Test Patient List" displayText="patients" />
      )}
    </div>
  );
};

export default TestPatientList;
