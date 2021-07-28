import React, { useEffect, useMemo, useState } from 'react';
import styles from './hts-overview-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { openmrsFetch } from '@openmrs/esm-framework';
import {
  ComposedModal,
  DataTableSkeleton,
  Modal,
  ModalBody,
  ModalHeader,
  OverflowMenu,
  OverflowMenuItem,
  Select,
  SelectItem,
  TextInput,
} from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import moment from 'moment';
import { getForm } from '../../utils/forms-loader';
import { observeOn } from 'rxjs/operators';
import OHRIForm from '../../forms/ohri-form.component';

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
  const [open, setOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState('view');
  const [currentEncounterUuid, setCurrentEncounterUuid] = useState('');
  const rowCount = 5;
  const htsRetrospectiveTypeUUID = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe'; // HTS Retrospective
  // const hivTestResultConceptUUID = 'f4470401-08e2-40e5-b52b-c9d1254a4d66'; //
  const hivTestResultConceptUUID = '77a518bb-3486-4e03-bcae-0b8ccf82c39d'; // HIV Result - Positive
  // const hivTestDateUUID = 'bce64590-4758-4011-9bf9-1b29d80b5f75'; //Concet for Test Date
  const hivTestFinal_DateUUID = ' e16b0068-b6a2-46b7-aba9-e3be00a7b4ab'; //

  const forceComponentUpdate = () => setCounter(counter + 1);

  const htsRetroForm = useMemo(() => {
    return getForm('hiv', 'hts_retro');
  }, []);

  const launchHTSForm = () => {
    // launchOHRIWorkSpace('ohri-forms-view-ext', {
    //   title: htsRetroForm?.name,
    //   state: { updateParent: forceComponentUpdate, formJson: htsRetroForm },
    // });
    setOpen(true);
  };
  const editHTSEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: htsRetroForm?.name,
      encounterUuid: encounterUuid,
      state: { updateParent: forceComponentUpdate, formJson: htsRetroForm },
    });
  };
  const viewHTSEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: htsRetroForm?.name,
      encounterUuid: encounterUuid,
      mode: 'view',
      state: { updateParent: forceComponentUpdate, formJson: htsRetroForm },
    });
  };

  const tableHeaders = [
    { key: 'date', header: 'Date of HIV Test', isSortable: true },
    { key: 'location', header: 'Location' },
    { key: 'result', header: 'Final HIV Test result' },
    { key: 'provider', header: 'HTS Provider' },
    { key: 'action', header: 'Action' },
  ];

  function getHtsEncounters(query: string, customRepresentation: string, encounterType: string) {
    return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`).then(({ data }) => {
      let rows = [];

      data.results.map(encounter => {
        const htsResult = encounter.obs.find(observation => observation.concept.name.uuid === hivTestResultConceptUUID);
        const htsProvider = encounter.encounterProviders.map(p => p.provider.name).join(' | ');
        const HIVTestDate = encounter.obs.find(observation => observation.concept.name.uuid === hivTestFinal_DateUUID);

        const encounterActionOverflowMenu = (
          <OverflowMenu flipped>
            <OverflowMenuItem
              itemText={t('viewHTSEncounter', 'View')}
              onClick={e => {
                e.preventDefault();
                // viewHTSEncounter(encounter.uuid);
                setCurrentEncounterUuid(encounter.uuid);
                setCurrentMode('view');
                setOpen(true);
              }}
            />
            <OverflowMenuItem
              itemText={t('editHTSEncounter', 'Edit')}
              onClick={e => {
                e.preventDefault();
                // editHTSEncounter(encounter.uuid);
                setCurrentEncounterUuid(encounter.uuid);
                setCurrentMode('edit');
                setOpen(true);
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ComposedModal open={open}>
        <ModalHeader style={{ backgroundColor: '#007d79', height: '48px' }}>
          {htsRetroForm?.name}
        </ModalHeader>
        <ModalBody>
          <OHRIForm formJson={htsRetroForm} encounterUuid={currentEncounterUuid} handleClose={handleClose} />
        </ModalBody>
      </ComposedModal>

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
