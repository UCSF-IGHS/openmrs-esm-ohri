import { openmrsFetch, navigate } from '@openmrs/esm-framework';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './encounter-list.scss';
import { encounterRepresentation } from '../../constants';
import { getForm, applyFormIntent, updateExcludeIntentBehaviour } from '../../utils/forms-loader';
import EmptyState from '../empty-state/empty-state.component';
import {
  launchFormInEditMode,
  launchFormInViewMode,
  launchForm,
  launchFormWithCustomTitle,
} from '../../utils/ohri-forms-commons';
import { DataTableSkeleton, Link, OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import OTable from '../data-table/o-table.component';
import { getObsFromEncounter } from './encounter-list.component';

/* eslint-disable no-debugger, no-console */
export interface MultipleEncounterListProps {
  patientUuid: string;
  encounterUuids: Array<string>;
  columns: Array<any>;
  headerTitle: string;
  description: string;
  filter?: (encounter: any) => boolean;
}

export function getObsFromMultipleEncounters(
  encounters,
  obsConcept,
  isDate?: Boolean,
  isTrueFalseConcept?: Boolean,
  encounterIndex?: number,
) {
  return getObsFromEncounter(encounters[encounterIndex], obsConcept, isDate, isTrueFalseConcept);
}

const MultipleEncounterList: React.FC<MultipleEncounterListProps> = ({
  patientUuid,
  encounterUuids,
  columns,
  headerTitle,
  description,
}) => {
  const { t } = useTranslation();
  const [allRows, setAllRows] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const headers = useMemo(() => {
    if (columns) {
      return columns.map(column => {
        return { key: column.key, header: column.header };
      });
    }
    return [];
  }, [columns]);

  const loadRows = useCallback(
    encounterTypes => {
      const rowData = [];
      setIsLoading(true);
      encounterTypes.forEach(encounterType => {
        const query = `encounterType=${encounterType}&patient=${patientUuid}`;
        openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
          if (data.results?.length > 0) {
            let sortedEncounters = data.results.sort(
              (firstEncounter, secondEncounter) =>
                new Date(secondEncounter.encounterDatetime).getTime() -
                new Date(firstEncounter.encounterDatetime).getTime(),
            );
            let lastEncounter = sortedEncounters[sortedEncounters.length - 1];
            rowData.push(sortedEncounters[sortedEncounters.length - 1]);
          } else {
            rowData.push(null);
          }
        });
      });
      setAllRows(rowData);
      updateTable(rowData, 0, pageSize);
      setIsLoading(false);
    },
    [patientUuid],
  );

  const updateTable = (fullDataset, start, itemCount) => {
    let currentRows = [];

    for (let i = start; i < start + itemCount; i++) {
      if (i < fullDataset.length) {
        currentRows.push(fullDataset[i]);
      }
    }

    const rows = currentRows.map(encounter => {
      const row = { id: encounter.uuid };
      columns.forEach((column, index) => {
        let val = column.getValue(encounter, index);
        if (column.link) {
          val = (
            <Link
              onClick={e => {
                e.preventDefault();
                if (column.link.handleNavigate) {
                  column.link.handleNavigate(encounter);
                } else {
                  column.link?.getUrl && navigate({ to: column.link.getUrl() });
                }
              }}>
              {val}
            </Link>
          );
        }
        row[column.key] = val;
      });

      return row;
    });
    setTableRows(rows);
  };
  const forceComponentUpdate = () => setCounter(counter + 1);

  useEffect(() => {
    loadRows(encounterUuids);
  }, [counter]);

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={5} />
      ) : allRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            </div>
            <OTable tableHeaders={headers} tableRows={tableRows} />
            {/* <Pagination
              page={page}
              pageSize={pageSize}
              pageSizes={[10, 20, 30, 40, 50]}
              totalItems={allRows.length}
              onChange={({ page, pageSize }) => {
                let startOffset = (page - 1) * pageSize;
                updateTable(allRows, startOffset, pageSize);
                setPage(page);
                setPageSize(pageSize);
              }}
            /> */}
          </div>
        </>
      ) : (
        <EmptyState displayText={description} headerTitle={headerTitle} />
      )}
    </>
  );
};

export default MultipleEncounterList;
