import React, { useState } from 'react';

import styles from './hts-overview-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { openmrsFetch } from '@openmrs/esm-framework';
import { DataTableSkeleton } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import HTSRestroForm from '../../forms/test-forms/hts_retrospective_form-schema';
import moment from 'moment';

interface HtsOverviewListProps {
  patientUuid: string;
}

export const htsFormSlot = 'hts-encounter-form-slot';
export const htsEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

const HtsOverviewList: React.FC<HtsOverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const rowCount = 5;
  const htsRetrospectiveTypeUUID = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe'; // HTS Retrospective
  const hivTestResultConceptUUID = 'f4470401-08e2-40e5-b52b-c9d1254a4d66';

  const forceComponentUpdate = () => setCounter(counter + 1);
  const launchHTSForm = () => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: HTSRestroForm.name,
      state: { updateParent: forceComponentUpdate, formJson: HTSRestroForm },
    });
  };
  const editHTSEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: HTSRestroForm.name,
      encounterUuid: encounterUuid,
      state: { updateParent: forceComponentUpdate, formJson: HTSRestroForm },
    });
  };
  const tableHeaders = [
    { key: 'date', header: 'Date', isSortable: true },
    { key: 'location', header: 'Location' },
    { key: 'result', header: 'Result' },
    { key: 'encounter_type', header: 'Encounter Type' },
    { key: 'provider', header: 'HTS Provider' },
    { key: 'action', header: 'Action' },
  ];

  function getHtsEncounters(query: string, customRepresentation: string, encounterType: string) {
    return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`).then(({ data }) => {
      let rows = [];
      data.results.map(encounter => {
        const htsResult = encounter.obs.find(observation => observation.concept.uuid === hivTestResultConceptUUID);
        const htsProvider = encounter.encounterProviders.map(p => p.provider.name).join(' | ');
        const editEncounterButton = (
          <Button
            kind="ghost"
            iconDescription="Edit"
            onClick={e => {
              e.preventDefault();
              editHTSEncounter(encounter.uuid);
            }}>
            {t('editHTSEncounter', 'Edit')}
          </Button>
        );
        rows.push({
          id: encounter.uuid,
          date: moment(encounter.encounterDatetime).format('DD-MMM-YYYY'),
          location: encounter.location.name,
          result: htsResult?.value?.name?.name || 'None',
          encounter_type: encounterType,
          provider: htsProvider,
          action: editEncounterButton,
        });
      });

      setTableRows(rows);
      setIsLoading(false);
    });
  }
  React.useEffect(() => {
    let query = `encounterType=${htsRetrospectiveTypeUUID}&patient=${patientUuid}`;
    getHtsEncounters(query, htsEncounterRepresentation, 'HTS Retrospective');
  }, [counter]);

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
                  launchHTSForm();
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
          launchForm={launchHTSForm}
        />
      )}
    </>
  );
};

export default HtsOverviewList;
