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
  headers: Array<any>;
  items: Array<any>;
  isActionable?: boolean;
  forms?: Array<any>;
  isStriped?: boolean;
}

export interface itemProps {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  hivStatus: string;
}

export const ExpandableList: React.FC<ExpandableListProps> = ({
  headerTitle,
  headers,
  items,
  isActionable = false,
  forms,
  isStriped = false,
}) => {
  return (
    <div className={styles.expandableListContainer}>
      <DataTable rows={items} headers={headers} useZebraStyles={isStriped}>
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
