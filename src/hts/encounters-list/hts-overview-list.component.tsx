import React, { useEffect, useState } from 'react';
import styles from './hts-overview-list.scss';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { openmrsFetch } from '@openmrs/esm-framework';
import { DataTableSkeleton, OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import moment from 'moment';
import { getForm } from '../../utils/forms-loader';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { OHRIFormLauncherWithIntent } from '../../components/ohri-form-launcher/ohri-form-laucher.componet';
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
  const hivTestResultConceptUUID = '106513BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'; // HIV Result
  const hivTestDateConceptUUID = '140414BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'; //
  const [htsForm, setHTSForm] = useState(getForm('hiv', 'hts'));

  const forceComponentUpdate = () => setCounter(counter + 1);

  const launchHTSForm = (form?: any) => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: htsRetroForm?.name,
      screenSize: 'maximize',
      state: { updateParent: forceComponentUpdate, formJson: htsRetroForm },
    });
  };
  const editHTSEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: htsRetroForm?.name,
      screenSize: 'maximize',
      encounterUuid: encounterUuid,
      state: { updateParent: forceComponentUpdate, formJson: htsForm },
    });
  };
  const viewHTSEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: htsRetroForm?.name,
      screenSize: 'maximize',
      encounterUuid: encounterUuid,
      mode: 'view',
      state: { updateParent: forceComponentUpdate, formJson: htsForm },
    });
  };

  const tableHeaders = [
    { key: 'date', header: 'Date of HIV Test', isSortable: true },
    { key: 'location', header: 'Location' },
    { key: 'result', header: 'HIV Test result' },
    { key: 'provider', header: 'HTS Provider' },
    { key: 'action', header: 'Action' },
  ];

  function getHtsEncounters(query: string, customRepresentation: string, encounterType: string) {
    return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`).then(({ data }) => {
      let rows = [];

      const sortedEncounters = data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );

      sortedEncounters.map(encounter => {
        const htsResult = encounter.obs.find(observation => observation.concept.name.uuid === hivTestResultConceptUUID);
        const htsProvider = encounter.encounterProviders.map(p => p.provider.name).join(' | ');
        const HIVTestDate = encounter.obs.find(observation => observation.concept.name.uuid === hivTestDateConceptUUID);

        const encounterActionOverflowMenu = (
          <OverflowMenu flipped className={styles.flippedOverflowMenu}>
            <OverflowMenuItem
              itemText={t('viewHTSEncounter', 'View')}
              onClick={e => {
                e.preventDefault();
                viewHTSEncounter(encounter.uuid);
              }}
            />
            <OverflowMenuItem
              itemText={t('editHTSEncounter', 'Edit')}
              onClick={e => {
                e.preventDefault();
                editHTSEncounter(encounter.uuid);
              }}
            />
          </OverflowMenu>
        );

        const HIVTestObservation = encounter.obs.find(
          observation => observation.concept.name.uuid === '140414BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
        );

        rows.push({
          id: encounter.uuid,
          date: moment(encounter.encounterDatetime).format('DD-MMM-YYYY'),
          dateOfTest: HIVTestDate ? moment(HIVTestDate.obsDatetime).format('DD-MMM-YYYY') : 'None',
          location: encounter.location.name,
          result: htsResult?.value?.name?.name || 'None',
          encounter_type: encounterType,
          provider: htsProvider,
          action: encounterActionOverflowMenu,
        });
      });
      setTableRows(rows);
      setIsLoading(false);
    });
  }
  useEffect(() => {
    let query = `encounterType=${htsRetrospectiveTypeUUID}&patient=${patientUuid}`;
    getHtsEncounters(query, htsEncounterRepresentation, 'HTS Retrospective');
  }, [counter]);

  const headerTitle = 'HTS Sessions';

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.widgetContainer}>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
              <OHRIFormLauncherWithIntent formJson={htsForm} launchForm={launchHTSForm} onChangeIntent={setHTSForm} />
            </div>
            <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
          </div>
        </>
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
