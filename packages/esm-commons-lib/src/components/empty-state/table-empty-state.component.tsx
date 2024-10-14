import React from 'react';
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import { useTranslation } from 'react-i18next';

export const TableEmptyState: React.FC<{ tableHeaders: Array<{ key: string; header: string }>; message: string }> = ({
  tableHeaders,
  message,
}) => {
  const { t } = useTranslation();
  return (
    <div style={{ marginLeft: '-16px' }}>
      <DataTable rows={[]} headers={tableHeaders} isSortable={true} size="short" useZebraStyles={true}>
        {({ headers, getHeaderProps, getTableProps }) => (
          <TableContainer>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      {...getHeaderProps({
                        header,
                        isSortable: header.isSortable,
                      })}
                    >
                      {t(header.header?.content ?? header.header)}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={tableHeaders.length}>{t(message)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};
