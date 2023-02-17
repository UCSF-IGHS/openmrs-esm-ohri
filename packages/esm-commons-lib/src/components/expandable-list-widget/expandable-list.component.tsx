import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DataTable,
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
  patientUuid: string;
  headerTitle: string;
  headers: Array<any>;
  items: Array<any>;
  launchOptions: {
    hideFormLauncher?: boolean;
    moduleName: string;
    displayText?: string;
  };
  isActionable?: boolean;
  isStriped?: boolean;
  filter?: (encounter: any) => boolean;
}

export interface ExpandableListColumn {
  key: string;
  header: string;
  value: string;
  getValue?: (encounter: any) => string;
  link?: any;
}

export const ExpandableList: React.FC<ExpandableListProps> = ({
  patientUuid,
  headerTitle,
  headers,
  items,
  isActionable = false,
  filter,
  launchOptions,
  isStriped = false,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

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
