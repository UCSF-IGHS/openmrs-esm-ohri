import React, { useState } from 'react';

import styles from './hts-overview-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { openmrsFetch, switchTo } from '@openmrs/esm-framework';
import { DataTableSkeleton } from 'carbon-components-react';
import dayjs from 'dayjs';
import EmptyState from '../../components/empty-state/empty-state.component';

interface HtsOverviewListProps {
  patientUuid: string;
}

const HtsOverviewList: React.FC<HtsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const rowCount = 5;
  const launchVisitNoteForm = () => {
    const url = `/patient/${patientUuid}/visitnotes/form`;
    switchTo('workspace', url, {
      title: t('visitNote', 'Visit Note'),
    });
  };

  const htsEncounterTypeUUID = '30b849bd-c4f4-4254-a033-fe9cf01001d8';
  const hivTestResultConceptUUID = '106513BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';

  const tableHeaders = [
    { key: 'date', header: 'Date', isSortable: true },
    { key: 'location', header: 'Location' },
    { key: 'result', header: 'Result' },
    { key: 'provider', header: 'HTS Provider' },
  ];

  function getHtsEncounters(query: string, customRepresentation: string) {
    return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`).then(({ data }) => {
      let rows = [];
      data.results.map(r => {
        let htsResult = r.obs.find(r => r.concept.name.uuid === hivTestResultConceptUUID);
        let htsProvider = r.encounterProviders.map(p => p.provider.name).join(' | ');
        rows.push({
          id: r.uuid,
          date: dayjs(r.encounterDatetime).format('DD-MMM-YYYY'),
          location: r.location.name,
          result: htsResult.value.name.name,
          provider: htsProvider,
        });
      });

      setTableRows(rows);
      setIsLoading(false);
    });
  }
  React.useEffect(() => {
    let query = `encounterType=${htsEncounterTypeUUID}&patient=${patientUuid}`;
    console.log('QUERY', query);
    let customRepresentation =
      'custom:(uuid,encounterDatetime,location:(uuid,name),' +
      'encounterProviders:(uuid,provider:(uuid,name)),' +
      'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

    getHtsEncounters(query, customRepresentation);
  }, []);

  const headerTitle = 'HTS Summary';

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeaderContainer}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            <div className={styles.toggleButtons}>
              <Button
                kind="ghost"
                renderIcon={Add16}
                iconDescription="New"
                onClick={e => {
                  e.preventDefault();
                }}>
                {t('add', 'New')}
              </Button>
            </div>
          </div>
          <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
        </div>
      ) : (
        <EmptyState
          displayText={t('htsEncounters', 'hts encounters')}
          headerTitle={headerTitle}
          launchForm={launchVisitNoteForm}
        />
      )}

      <div className={styles.widgetContainer} style={{ marginTop: '2.5rem' }}>
        <div className={styles.widgetHeaderContainer}>
          <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>Client Linkage</h4>
          <div className={styles.toggleButtons}>
            <Button
              kind="ghost"
              renderIcon={Add16}
              iconDescription="New"
              onClick={e => {
                e.preventDefault();
              }}>
              {t('add', 'New')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HtsOverviewList;
