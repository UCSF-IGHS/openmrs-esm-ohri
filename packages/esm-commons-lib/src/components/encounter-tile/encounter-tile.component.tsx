import { openmrsFetch } from '@openmrs/esm-framework';
import { CodeSnippetSkeleton, Tile, Column } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import styles from './encounter-tile.scss';
import {
  artStopDateUUID,
  artTherapyDateTime_UUID,
  dateRestartedUUID,
  encounterRepresentation,
  substitutionDateUUID,
  switchDateUUID,
} from '../../constants';
import moment from 'moment';
import { findObs, getObsFromEncounter } from '../../index';

export interface EncounterTileColumn {
  key: string;
  header: string;
  encounterUuid: string;
  concept: string;
  isConceptDate?: Boolean;
  isConceptSummaryDate?: Boolean;
  isSummaryDaysCalculation?: Boolean;
  obsValue?: string;
  summaryConcept?: string;
  summaryObsValue?: string;
  isARTDateConcept?: Boolean;
}
export interface EncounterTileProps {
  patientUuid: string;
  columns: Array<any>;
  headerTitle: string;
}

export function getEncounterValues(encounter, param: string, isDate?: Boolean) {
  if (isDate) return moment(encounter[param]).format('DD-MMM-YYYY');
  else return encounter[param] ? encounter[param] : '--';
}

export const EncounterTile: React.FC<EncounterTileProps> = ({ patientUuid, columns, headerTitle }) => {
  const [lastEncounter, setLastEncounter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    columns.map((column) => {
      const lastEncounter = fetchPatientLastEncounter(column.encounterUuid);
      lastEncounter.then((value) => {
        if (column.isARTDateConcept) {
          column.obsValue = getObsFromEncounter(
            value,
            getARTDateConcept(
              value,
              artTherapyDateTime_UUID,
              switchDateUUID,
              substitutionDateUUID,
              artStopDateUUID,
              dateRestartedUUID,
            ),
            column.isConceptDate,
          );
        } else {
          column.obsValue = getObsFromEncounter(value, column.concept, column.isConceptDate);
        }

        if (column.summaryConcept) {
          if (column.isSummaryDaysCalculation) {
            let summaryDate = getObsFromEncounter(value, column.summaryConcept);
            if (summaryDate !== '--') {
              const dateDifference = new Date().getTime() - new Date(summaryDate).getTime();
              const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
              column.summaryObsValue = `${totalDays} days`;
            }
          } else {
            column.summaryObsValue = getObsFromEncounter(value, column.summaryConcept, column.isConceptSummaryDate);
          }
        }
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
  }

  const getARTDateConcept = (encounter, startDate, switchDate, substitutionDate, stopDate, restartDate): string => {
    let artStartDate = findObs(encounter, startDate);
    let artSwitchDate = findObs(encounter, switchDate);
    let artSubstitutionDate = findObs(encounter, substitutionDate);
    let artStopDate = findObs(encounter, stopDate);
    let artRestartDate = findObs(encounter, restartDate);

    artStartDate = artStartDate ? artStartDate.value : null;
    artSubstitutionDate = artSubstitutionDate ? artSubstitutionDate.value : null;
    artSwitchDate = artSwitchDate ? artSwitchDate.value : null;
    artStopDate = artStopDate ? artStopDate.value : null;
    artRestartDate = artRestartDate ? artRestartDate.value : null;

    let latestDateConcept: string = startDate;
    let latestDate = artStartDate;
    if (artSubstitutionDate != null) {
      latestDateConcept = substitutionDate;
      latestDate = artSubstitutionDate;
    }
    if (artSwitchDate != null) {
      latestDate = artSwitchDate;
      latestDateConcept = switchDate;
    }
    if (artStopDate != null) {
      latestDate = artStopDate;
      latestDateConcept = stopDate;
    }
    if (artRestartDate != null) {
      latestDate = artRestartDate;
      latestDateConcept = restartDate;
    }

    return latestDateConcept;
  };

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
                  <span className={styles.tileValue}>{column.obsValue}</span>
                  <span className={styles.tileTitle}> {column.summaryObsValue} </span>
                </div>
              </div>
            ))}
          </Column>
        </Tile>
      )}
    </>
  );
};
