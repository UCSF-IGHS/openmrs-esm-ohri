import React, { useEffect, useState } from 'react';
import {
  DataTable,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  DataTableSkeleton,
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientList } from '../../hooks/usePatientList';
import { EmptyState } from '@openmrs/esm-patient-common-lib';
import { navigate } from '@openmrs/esm-framework';

export interface PatientListTableProps {
  title: string;
  headerData: Array<{ header: string; key: string }>;
  rowData: Array<{}>;
}

export const PatientListTable: React.FC = () => {
  const { t } = useTranslation();
  const { patients, error, isLoading, total } = usePatientList();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [nextOffSet, setNextOffSet] = useState(0);
  const [totalPatientCount, setPatientCount] = useState(0);

  useEffect(() => {
    setPatientCount(total);
  }, [total]);

  const headerData = [
    {
      key: 'patientLink',
      header: t('name', 'Name'),
    },
    {
      key: 'gender',
      header: t('gender', 'Gender'),
    },
    {
      key: 'age',
      header: t('age', 'Age'),
    },
    {
      key: 'actions',
      header: '',
    },
  ];

  const displayTitle = t('patientList', 'Patient List');
  const addNewPatient = () => navigate({ to: '${openmrsSpaBase}/patient-registration' });

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} columnCount={4} />
      ) : patients.length > 0 ? (
        <DataTable rows={patients} headers={headerData} isSortable>
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <div>
              <TableContainer title={displayTitle}>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                page={page}
                pageSize={pageSize}
                pageSizes={[10, 20, 30, 40, 50]}
                totalItems={totalPatientCount}
                onChange={({ page, pageSize }) => {
                  setPage(page);
                  setNextOffSet((page - 1) * pageSize);
                  setPageSize(pageSize);
                }}
              />
            </div>
          )}
        </DataTable>
      ) : (
        <EmptyState displayText={displayTitle} headerTitle={displayTitle} launchForm={addNewPatient} />
      )}
    </>
  );
};
