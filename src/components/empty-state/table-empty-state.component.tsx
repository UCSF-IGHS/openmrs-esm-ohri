import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react/lib/components/DataTable';
import React from 'react';

const TableEmptyState: React.FC<{ tableHeaders: Array<{ key: string; header: string }>; message: string }> = ({
  tableHeaders,
  message,
}) => {
  return (
    <div style={{ marginLeft: '-16px' }}>
      <DataTable rows={[]} headers={tableHeaders} isSortable={true} size="short" useZebraStyles={true}>
        {({ headers, getHeaderProps, getTableProps }) => (
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
                <TableRow>
                  <TableCell colSpan={tableHeaders.length}>{message}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};

export default TableEmptyState;
