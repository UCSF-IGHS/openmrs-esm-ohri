import React, { useEffect, useState } from 'react';
import styles from './card-summary.scss';
import { SkeletonText, Tile, Column } from '@carbon/react';

// Defines the props for the component
export interface CardSummaryProps {
  patientUuid: string;
  columns: Array<any>;
  headerTitle: string;
  isActionable?: boolean;
}

// Defines props for the individual tiles within the card (mostly for the encounter)
export interface TileSummaryProps {
  key: string;
  header: string;
  encounterUuid: string;
  getObsValue: (encounter: any) => string;
  getSummaryObsValue?: (encounter: any) => string;
  encounter?: any; //todo pirupius we might need to remove this
  hasSummary?: boolean;
}

export const CardSummary: React.FC<CardSummaryProps> = ({
  patientUuid,
  columns,
  headerTitle,
  isActionable = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
            {columns.map((column) => (
              <div className={styles.tileBox}>
                <div className={styles.tileBoxColumn}>
                  <span className={styles.tileTitle}> {column.header} </span>
                  <span className={styles.tileValue}>{column.getObsValue(column.encounter)}</span>
                  {column.hasSummary ? (
                    <span className={styles.tileTitle}> {column.getSummaryObsValue(column.encounter)} </span>
                  ) : (
                    <span></span>
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
