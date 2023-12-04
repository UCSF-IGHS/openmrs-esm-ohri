import React, { useEffect, useState } from 'react';
import styles from './summary-card.scss';
import { SkeletonText, Tile, Column } from '@carbon/react';
import { LazyCell } from '../lazy-cell/lazy-cell.component';
import { OpenmrsEncounter } from '@openmrs/openmrs-form-engine-lib';
import { fetchLatestEncountersOfTypes } from './helpers';

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

export const SummaryCard: React.FC<SummaryCardProps> = ({ patientUuid, columns, headerTitle }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [columnEncountersMappings, setColumnEncountersMappings] = useState<
    {
      column: SummaryCardColumn;
      encounters: OpenmrsEncounter[];
    }[]
  >([]);

  useEffect(() => {
    Promise.all(columns.map((column) => fetchLatestEncountersOfTypes(patientUuid, column.encounterTypes))).then(
      (results) => {
        const filteredResults = results.map((result) => result.filter(Boolean));
        setColumnEncountersMappings(columns.map((column, index) => ({ column, encounters: filteredResults[index] })));
        setIsLoading(false);
      },
    );
  }, [columns, patientUuid]);

  return (
    <>
      {isLoading ? (
        <SkeletonText paragraph={true} />
      ) : (
        <Tile className={styles.tile}>
          <div className={styles.cardTitle}>
            <h4 className={styles.title}> {headerTitle} </h4>
          </div>
          <Column className={styles.columnContainer}>
            {columnEncountersMappings.map(({ column, encounters }) => (
              <div className={styles.tileBox}>
                <div className={styles.tileBoxColumn}>
                  <span className={styles.tileTitle}> {column.header} </span>
                  <span className={styles.tileValue}>
                    <LazyCell lazyValue={column.getObsValue(encounters)} />
                  </span>
                  {column.getObsSummary && (
                    <span className={styles.tileTitle}>
                      <LazyCell lazyValue={column.getObsSummary(encounters)} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </Column>
        </Tile>
      )}
    </>
  );
};
