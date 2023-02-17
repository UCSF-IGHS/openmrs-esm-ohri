import React from 'react';
import {
  DataTable,
  Link,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatients } from '../../api/api';

export interface PatientListDataTableProps {
  title: string;
  headerData: Array<{ header: string; key: string }>;
  rowData: Array<{}>;
}

export const PatientListDataTable: React.FC = () => {
  const { t } = useTranslation();
  const { patients, error, total } = usePatients();

  const headerData = [
    {
      key: 'name',
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
      key: 'last_visit',
      header: t('lastVisit', 'Last Visit'),
    },
    {
      key: 'actions',
      header: '',
    },
  ];

  const rowData = [
    {
      attached_groups: 'Kevin’s VM Groups',
      id: 'a',
      name: 'Load Balancer 3',
      port: 3000,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link disabled>Disabled</Link>,
    },
    {
      attached_groups: 'Maureen’s VM Groups',
      id: 'b',
      name: 'Load Balancer 1',
      port: 443,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link>Starting</Link>,
    },
    {
      attached_groups: 'Andrew’s VM Groups',
      id: 'c',
      name: 'Load Balancer 2',
      port: 80,
      protocol: 'HTTP',
      rule: 'DNS delegation',
      status: <Link>Active</Link>,
    },
    {
      attached_groups: 'Marc’s VM Groups',
      id: 'd',
      name: 'Load Balancer 6',
      port: 3000,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link disabled>Disabled</Link>,
    },
    {
      attached_groups: 'Mel’s VM Groups',
      id: 'e',
      name: 'Load Balancer 4',
      port: 443,
      protocol: 'HTTP',
      rule: 'Round robin',
      status: <Link>Starting</Link>,
    },
    {
      attached_groups: 'Ronja’s VM Groups',
      id: 'f',
      name: 'Load Balancer 5',
      port: 80,
      protocol: 'HTTP',
      rule: 'DNS delegation',
      status: <Link>Active</Link>,
    },
  ];

  return (
    <DataTable rows={rowData} headers={headerData} isSortable>
      {({ rows, headers, getHeaderProps, getTableProps }) => (
        <TableContainer title={t('patientList', 'Patient List')}>
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
      )}
    </DataTable>
  );
};
