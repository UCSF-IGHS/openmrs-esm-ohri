import React from 'react';
import { CodeSnippetSkeleton, Tile, Column } from '@carbon/react';
import { LazyCell } from '../lazy-cell/lazy-cell.component';
import { useLastEncounter } from '../../hooks/useLastEncounter';

import styles from '../../styleguide/tiles.scss';

export interface EncounterTileColumn {
  key: string;
  header: string;
  encounterUuid: string;
  getObsValue: (encounter: any) => string | Promise<string>;
  getSummaryObsValue?: (encounter: any) => string | Promise<string>;
  encounter?: any;
  hasSummary?: Boolean;
}
export interface EncounterTileProps {
  patientUuid: string;
  columns: Array<any>;
  headerTitle: string;
}

export interface EncounterValuesTileProps {
  patientUuid: string;
  column: any;
}

export const EncounterTile: React.FC<EncounterTileProps> = ({ patientUuid, columns, headerTitle }) => {
  return (
    <div className={styles.tilesContainer}>
      <Tile className={styles.tile}>
        <div className={styles.cardTitle}>
          <h4 className={styles.title}> {headerTitle} </h4>
        </div>
        <Column className={styles.tabletTileTitle}>
          {columns.map((column, ind) => (
            <EncounterValuesTile key={ind} patientUuid={patientUuid} column={column} />
          ))}
        </Column>
      </Tile>
    </div>
  );
};

export const EncounterValuesTile: React.FC<EncounterValuesTileProps> = ({ patientUuid, column }) => {
  const { lastEncounter, isLoading, error, isValidating } = useLastEncounter(patientUuid, column.encounterUuid);

  if (isLoading || isValidating) {
    return <CodeSnippetSkeleton type="multi" data-testid="skeleton-text" />;
  }

  if (error || lastEncounter === undefined) {
    return (
      <div className={styles.tileBox}>
        <div className={styles.tileBoxColumn}>
          <span className={styles.tileTitle}> {column.header} </span>
          <span className={styles.tileValue}>--</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tileBox}>
      <div className={styles.tileBoxColumn}>
        <span className={styles.tileTitle}> {column.header} </span>
        <span className={styles.tileValue}>
          <LazyCell lazyValue={column.getObsValue(lastEncounter)} />
        </span>
        {column.hasSummary ? (
          <span className={styles.tileTitle}>
            <LazyCell lazyValue={column.getSummaryObsValue(lastEncounter)} />
          </span>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};
