import React, { useEffect, useState } from 'react';
import { SkeletonText, Tile, Column } from '@carbon/react';
import { LazyCell } from '../lazy-cell/lazy-cell.component';
import { type OpenmrsEncounter } from '@openmrs/openmrs-form-engine-lib';
import { fetchLatestEncountersOfTypes } from './helpers';

import styles from '../../styleguide/tiles.scss';

export interface SummaryCardProps {
  patientUuid: string;
  columns: Array<SummaryCardColumn>;
  headerTitle: string;
  maxRowItems?: number;
}

export interface SummaryCardColumn {
  key: string;
  header: string;
  encounterTypes: string[];
  getObsValue: (encounter: OpenmrsEncounter[]) => string | Promise<string>;
  getObsSummary?: (encounter: OpenmrsEncounter[]) => string | Promise<string>;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ patientUuid, columns, headerTitle, maxRowItems }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [columnEncountersMappings, setColumnEncountersMappings] = useState<
    {
      column: SummaryCardColumn;
      encounters: OpenmrsEncounter[];
    }[]
  >([]);
  const [groupedEncounterMappings, setGroupedEncounterMappings] = useState<Array<any>>([]);

  useEffect(() => {
    Promise.all(
      columns.map((column) => {
        const encounterTypes = Array.isArray(column?.encounterTypes)
          ? column.encounterTypes
          : column?.encounterTypes
            ? [column.encounterTypes]
            : [];

        return fetchLatestEncountersOfTypes(patientUuid, encounterTypes);
      }),
    ).then((results) => {
      const filteredResults = results.map((result) => result.filter(Boolean));
      setColumnEncountersMappings(
        columns.map((column, index) => ({
          column,
          encounters: filteredResults[index],
        })),
      );

      setIsLoading(false);
    });
  }, [columns, patientUuid]);

  useEffect(() => {
    if (maxRowItems && columnEncountersMappings.length > maxRowItems) {
      let groups = [];

      for (let i = 0; i < columnEncountersMappings.length; i += maxRowItems) {
        const row = columnEncountersMappings.slice(i, i + maxRowItems);
        groups.push(row);
      }
      setGroupedEncounterMappings(groups);
    }
  }, [columnEncountersMappings, maxRowItems]);

  return (
    <>
      {isLoading ? (
        <SkeletonText paragraph={true} />
      ) : (
        <Tile className={styles.tile}>
          <div className={styles.cardTitle}>
            <h4 className={styles.title}> {headerTitle} </h4>
          </div>
          {maxRowItems ? (
            groupedEncounterMappings.map((group) => (
              <Column className={styles.columnContainer}>
                {group.map(({ column, encounters }) => (
                  <SummaryItem column={column} encounters={encounters} />
                ))}
              </Column>
            ))
          ) : (
            <Column className={styles.columnContainer}>
              {columnEncountersMappings.map(({ column, encounters }) => (
                <SummaryItem column={column} encounters={encounters} />
              ))}
            </Column>
          )}
        </Tile>
      )}
    </>
  );
};

function SummaryItem({ column, encounters }) {
  return (
    <div className={styles.tileBox}>
      <div className={styles.tileBoxColumn}>
        <span className={styles.tileTitle}> {column.header} </span>
        <span className={styles.tileValue}>
          {column?.getObsValue ? <LazyCell lazyValue={column?.getObsValue(encounters)} /> : '--'}
        </span>
        {column.getObsSummary && (
          <span className={styles.tileTitle}>
            <LazyCell lazyValue={column.getObsSummary(encounters)} />
          </span>
        )}
      </div>
    </div>
  );
}
