import React, { useCallback, useEffect, useState } from 'react';
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
  Search,
  Layer,
  InlineLoading,
  Tile,
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { usePatientList } from '../../hooks/usePatientList';
import { EmptyState } from '@openmrs/esm-patient-common-lib';
import { navigate } from '@openmrs/esm-framework';
// eslint-disable-next-line no-restricted-imports
import { debounce } from 'lodash';
import styles from './patient-list.scss';
export interface PatientListProps {
  title: string;
  headerData: Array<{ header: string; key: string }>;
  rowData: Array<{}>;
}

export const PatientList: React.FC = () => {
  const { t } = useTranslation();
  const [nextOffSet, setNextOffSet] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const { patients, error, isLoading, total } = usePatientList(nextOffSet, pageSize, searchTerm);
  const [page, setPage] = useState(1);
  const [totalPatientCount, setPatientCount] = useState(0);

  useEffect(() => {
    // Carbon's pagination component supports a max of 10,000 items
    // see: https://github.com/carbon-design-system/carbon/issues/6836
    setPatientCount(total <= 10000 ? total : 10000);
  }, [total]);

  const onSearchQueryChange = debounce((val) => {
    setSearchTerm(val);
  }, 300);

  const handleClear = useCallback(() => setSearchTerm(''), [setSearchTerm]);

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
    <div>
      {isLoading && !searchTerm ? (
        <DataTableSkeleton rowCount={5} columnCount={4} />
      ) : patients?.length > 0 ? (
        <Layer>
          <Tile className={styles.tile}>
            <div className={styles.headerWrapper}>
              <h1 className={styles.heading}>{displayTitle}</h1>
            </div>
            <div id="table-tool-bar" className={styles.searchContainer}>
              <div>{isLoading && searchTerm && <InlineLoading />}</div>
              <div className={styles.searchBox}>
                <Search
                  className={styles.searchField}
                  labelText="Search"
                  placeholder="Search Patient List"
                  size="sm"
                  light
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                  onClear={handleClear}
                />
              </div>
            </div>
            <DataTable rows={patients} headers={headerData} isSortable>
              {({ rows, headers, getHeaderProps, getTableProps }) => (
                <div>
                  <TableContainer style={{ backgroundColor: 'transparent' }}>
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
          </Tile>
        </Layer>
      ) : (
        <EmptyState displayText={displayTitle} headerTitle={displayTitle} launchForm={addNewPatient} />
      )}
    </div>
  );
};
