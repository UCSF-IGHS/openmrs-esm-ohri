import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react/lib/components/DataTable';
import Pagination from 'carbon-components-react/lib/components/Pagination';
import { debounce } from 'lodash';
import React, { useMemo } from 'react';
import styles from './patient-table.component.scss';

const PatientTable: React.FC<PatientTableProps> = ({ patients, columns, search, pagination }) => {
  const rows: Array<any> = useMemo(
    () =>
      patients.map(patient => {
        const row = {};
        columns.forEach(column => {
          row['id'] = patient['id'] || patient['uuid'];
          row[column.key] = column.getValue ? column.getValue(patient) : patient[column.key];
        });
        return row;
      }),
    [patients, columns],
  );

  return (
    <div className={styles.table1}>
      <DataTable rows={rows} headers={columns} isSortable={true} size="short" useZebraStyles={true}>
        {({ rows, headers, getHeaderProps, getTableProps, onInputChange }) => (
          <TableContainer>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader
                      {...getHeaderProps({
                        header,
                        isSortable: header.isSortable,
                      })}>
                      {header.header?.content ?? header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value?.content ?? cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      {pagination.usePagination && (
        <Pagination
          page={pagination.currentPage}
          pageSize={pagination.pageSize}
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={pagination.totalItems}
          onChange={pagination.onChange}
        />
      )}
    </div>
  );
};

interface PatientTableProps {
  patients: Array<Object>;
  columns: Array<PatientTableColumn>;
  search: {
    onSearch: (searchTerm: string) => {};
    placeHolder: string;
  };
  pagination: {
    usePagination: boolean;
    currentPage: number;
    onChange: (props: any) => {};
    pageSize: number;
    totalItems: number;
  };
}
export interface PatientTableColumn {
  key: string;
  header: string;
  getValue?: (patient) => any;
}

export default PatientTable;
