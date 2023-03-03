import { openmrsFetch } from '@openmrs/esm-framework';
import { CodeSnippetSkeleton, Tile, Column } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import styles from './encounter-tile.scss';
import { encounterRepresentation } from '../../constants';
import { LazyCell } from '../lazy-cell/lazy-cell.component';

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

export const EncounterTile: React.FC<EncounterTileProps> = ({ patientUuid, columns, headerTitle }) => {
  const [lastEncounter, setLastEncounter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    columns.map((column) => {
      const lastEncounter = fetchPatientLastEncounter(column.encounterUuid);
      lastEncounter.then((value) => {
        column.encounter = value;
      });
    });
  }, []);

  async function fetchPatientLastEncounter(encounterType: string) {
    const query = `encounterType=${encounterType}&patient=${patientUuid}`;
    const encounterResults = await openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`);
    if (encounterResults.data.results?.length > 0) {
      const sortedEncounters = encounterResults.data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );
      setLastEncounter(sortedEncounters[0]);
      setIsLoading(false);
      return sortedEncounters[0];
    }
    return null;
  }

  return (
    <>
      {isLoading ? (
        <CodeSnippetSkeleton type="multi" />
      ) : (
        <Tile className={styles.tile}>
          <div className={styles.cardTitle}>
            <h4 className={styles.title}> {headerTitle} </h4>
          </div>

          <Column className={styles.tabletTileTitle}>
            {columns.map((column) => (
              <div className={styles.tileBox}>
                <div className={styles.tileBoxColumn}>
                  <span className={styles.tileTitle}> {column.header} </span>
                  <span className={styles.tileValue}>
                    <LazyCell lazyValue={column.getObsValue(column.encounter)} />
                  </span>
                  {column.hasSummary ? (
                    <span className={styles.tileTitle}>
                      <LazyCell lazyValue={column.getSummaryObsValue(column.encounter)} />
                    </span>
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
