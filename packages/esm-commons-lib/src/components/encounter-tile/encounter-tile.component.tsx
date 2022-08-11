import { openmrsFetch } from '@openmrs/esm-framework';
import { CodeSnippetSkeleton, Tile, Row, Button } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../empty-state/empty-state.component';
import styles from './encounter-tile.scss';
import { encounterRepresentation } from '../../constants';
import moment from 'moment';

export interface EncounterTileColumn {
  key: string;
  header: string;
  getValue: (encounter: any) => string;
  link?: any;
}
export interface EncounterTileProps {
  patientUuid: string;
  encounterUuid: string;
  form?: { package: string; name: string; view?: string };
  columns: Array<any>;
  headerTitle: string;
  description: string;
  dropdownText?: string;
  hideFormLauncher?: boolean;
  forms?: Array<{
    package: string;
    name: string;
    view?: string;
    excludedIntents?: Array<string>;
    fixedIntent?: string;
  }>;
  filter?: (encounter: any) => boolean;
  tileStyle: string;
}

export function getEncounterValues(encounter, param: string, isDate?: Boolean) {
  if (isDate) return moment(encounter[param]).format('DD-MMM-YYYY');
  else return encounter[param] ? encounter[param] : '--';
}

export function formatDateTime(dateString: string): any {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  if (dateString.includes('.')) {
    dateString = dateString.split('.')[0];
  }
  return moment(dateString, format, true).toDate();
}

function obsArrayDateComparator(left, right) {
  return formatDateTime(right.obsDatetime) - formatDateTime(left.obsDatetime);
}

export function findObs(encounter, obsConcept): Record<string, any> {
  const allObs = encounter?.obs?.filter(observation => observation.concept.uuid === obsConcept) || [];
  return allObs?.length == 1 ? allObs[0] : allObs?.sort(obsArrayDateComparator)[0];
}

export function getObsFromEncounter(encounter, obsConcept, isDate?: Boolean, isTrueFalseConcept?: Boolean) {
  const obs = findObs(encounter, obsConcept);

  if (isTrueFalseConcept) {
    if (obs.value.uuid == 'cf82933b-3f3f-45e7-a5ab-5d31aaee3da3') {
      return 'Yes';
    } else {
      return 'No';
    }
  }
  if (!obs) {
    return '--';
  }
  if (isDate) {
    return moment(obs.value).format('DD-MMM-YYYY');
  }
  if (typeof obs.value === 'object') {
    return obs.value.names?.find(conceptName => conceptName.conceptNameType === 'SHORT')?.name || obs.value.name.name;
  }
  return obs.value;
}

export const EncounterTile: React.FC<EncounterTileProps> = ({
  patientUuid,
  encounterUuid,
  form,
  columns,
  headerTitle,
  description,
  dropdownText,
  hideFormLauncher,
  forms,
  filter,
  tileStyle,
}) => {
  const { t } = useTranslation();
  const [allRows, setAllRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  const headers = useMemo(() => {
    if (columns) {
      return columns.map(column => {
        return { key: column.keys, header: column.header };
      });
    }
    return [];
  }, [columns]);

  const loadRows = useCallback(
    encounterType => {
      const query = `encounterType=${encounterType}&patient=${patientUuid}`;
      openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
        if (data.results?.length > 0) {
          let sortedEncounters = data.results.sort(
            (firstEncounter, secondEncounter) =>
              new Date(secondEncounter.encounterDatetime).getTime() -
              new Date(firstEncounter.encounterDatetime).getTime(),
          );

          if (filter) {
            sortedEncounters = sortedEncounters.filter(encounter => filter(encounter));
          }
          setAllRows(sortedEncounters);
        } else {
          setAllRows([]);
        }
        setIsLoading(false);
      });
    },
    [patientUuid],
  );

  useEffect(() => {
    loadRows(encounterUuid);
  }, [counter]);

  const rows = allRows.map(encounter => {
    const row = { id: encounter.uuid };

    columns.forEach(column => {
      let val = column.getValue(encounter);

      row[column.key] = val;
      row[column.header] = column.header;
    });
    return row;
  });

  const mockData_HIV_Status = [
    { field: 'Last Viral Load', value: 2000, date: '12-Jan-2022' },
    { field: 'Last CD4 Count', value: 132, date: '12-Jan-2022' },
    { field: 'Enrolled in care', value: '10-Jan-2006', date: '' },
    { field: 'Current WHO stage', value: '1', date: '' },
  ];

  const mockData_Current_ARV = [
    { field: 'Current ARV regimen', value: 'Lamivudine, Tenofovir, Dolutegravir' },
    { field: 'Drug allergies', value: 'NSAIDs, Heparins' },
    { field: 'ARV initiation date', value: '09-Feb-2006' },
  ];

  const updateRowTiles = () => {
    let currentRows = [];
  };
  return (
    <>
      {isLoading ? (
        <CodeSnippetSkeleton type="multi" />
      ) : allRows.length > 0 ? (
        <Tile className={styles.tile}>
          <div className={styles.cardTitle}>
            <h4 className={styles.title}> {headerTitle} </h4>
            {tileStyle == 'ARV' ? (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button size="small" kind="ghost">
                  Change <ArrowRight32 style={{ width: '12px', height: '10px' }} />
                </Button>
              </div>
            ) : (
              <span> </span>
            )}
          </div>
          {tileStyle == 'ARV' ? (
            <Row className={styles.tabletTileTitleARV}>
              {mockData_Current_ARV.map(column => (
                <div className={styles.tileBoxARV}>
                  <div className={styles.tileBoxColumnARV}>
                    <span className={styles.tileTitleARV}> {column.field} </span>
                    <span className={styles.tileValueARV}> {column.value} </span>
                  </div>
                </div>
              ))}
            </Row>
          ) : (
            <Row className={styles.tabletTileTitle}>
              {mockData_HIV_Status.map(column => (
                <div className={styles.tileBox}>
                  <div className={styles.tileBoxColumn}>
                    <span className={styles.tileTitle}> {column.field} </span>
                    <span className={styles.tileValue}> {column.value} </span>
                    <span className={styles.tileTitle}> {column.date} </span>
                  </div>
                </div>
              ))}
            </Row>
          )}
        </Tile>
      ) : (
        <EmptyState displayText={description} headerTitle={headerTitle} />
      )}
    </>
  );
};
