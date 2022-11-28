import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DataTable,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableExpandHeader,
  TableRow,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow,
} from '@carbon/react';
import styles from './expandable-list.scss';

export interface ExpandableListProps {
  headerTitle: string;
  items: Array<any>;
  isActionable?: boolean;
  forms?: Array<any>;
  isStriped?: boolean;
}

export const ExpandableList: React.FC<ExpandableListProps> = ({
  headerTitle,
  items,
  isActionable = false,
  forms,
  isStriped = false,
}) => {
  const headers = [
    {
      header: 'ID',
      key: 'id',
    },
    {
      header: 'Name',
      key: 'name',
    },
    {
      header: 'Relationship',
      key: 'relationship',
    },
    {
      header: 'Date of birth',
      key: 'dateOfBirth',
    },
    {
      header: 'HIV Status',
      key: 'hivStatus',
    },
  ];

  const rows = [
    {
      id: '12345A220001',
      name: 'Baby girl Alice',
      relationship: 'Child',
      dateOfBirth: '06-Apr-2019',
      hivStatus: 'Negative',
    },
    {
      id: '12345A220002',
      name: 'Jane Arron',
      relationship: 'Child',
      dateOfBirth: '18-Jul-2017',
      hivStatus: 'Negative',
    },
    {
      id: '12345A220003',
      name: 'Peter Musabe',
      relationship: 'Father',
      dateOfBirth: '22-Dec-1988',
      hivStatus: 'Negative',
    },
  ];

  return (
    <div className={styles.expandableListContainer}>
      <DataTable rows={rows} headers={headers} useZebraStyles={isStriped}>
        {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getTableContainerProps }) => (
          <TableContainer title={headerTitle} {...getTableContainerProps()}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  <TableExpandHeader />
                  {headers.map((header, i) => (
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableExpandRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}> {cell.value}</TableCell>
                      ))}
                    </TableExpandRow>
                    <TableExpandedRow colSpan={headers.length + 1} className="demo-expanded-td">
                      <h6> Expandable row content</h6>
                      <div> Description here</div>
                    </TableExpandedRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};
