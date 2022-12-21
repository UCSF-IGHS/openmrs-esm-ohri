import React, { useEffect, useState } from 'react';
import styles from './card-summary.scss';
import { SkeletonText, Tile, Column } from '@carbon/react';
import { encounterRepresentation } from '../../constants';
import { openmrsFetch } from '@openmrs/esm-framework';

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
  encounterUuids?: string[];
  getObsValue: (encounter: any) => string;
  getSummaryObsValue?: (encounter: any) => string;
  encounter?: any; //todo pirupius we might need to remove this
  encounters?: any[];
  hasSummary?: boolean;
}

export const CardSummary: React.FC<CardSummaryProps> = ({
  patientUuid,
  columns,
  headerTitle,
  isActionable = false,
}) => {
  const [lastEncounter, setLastEncounter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    columns.map((column) => {
      if (column.encounterUuids) {
        for (let encounterUuid of column.encounterUuids) {
          let latestEncounter = fetchPatientLastEncounter(encounterUuid);
          latestEncounter.then((value) => {
            column.encounters.push(value);
          });
        }
      } else {
        const lastEncounter = fetchPatientLastEncounter(column.encounterUuid);
        lastEncounter.then((value) => {
          column.encounter = value;
        });
      }
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
  }

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
                  {column.encounters ? (
                    <span className={styles.tileValue}>{column.getObsValue(column.encounters)}</span>
                  ) : (
                    <span className={styles.tileValue}>{column.getObsValue(column.encounter)}</span>
                  )}

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
