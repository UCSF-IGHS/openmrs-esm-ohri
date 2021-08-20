import React, { useEffect, useMemo, useState } from 'react';
import styles from './care-and-treatment-list.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Add16 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import OTable from '../../components/data-table/o-table.component';
import { openmrsFetch } from '@openmrs/esm-framework';
import {
  ComposedModal,
  DataTableSkeleton,
  ModalBody,
  ModalHeader,
  OverflowMenu,
  OverflowMenuItem,
  Tab,
  Tabs,
} from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import moment from 'moment';
import { getForm } from '../../utils/forms-loader';
import OHRIForm from '../../forms/ohri-form.component';
import { SessionMode } from '../../forms/types';
import {
  careAndTreatmentEncounterType,
  dateOfHIVDiagnosisConcept,
  patientTypeEnrollmentConcept,
  studyPopulationTypeConcept,
} from '../../constants';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';

interface CareAndTreatmentProps {
  patientUuid: string;
  viewMode: string;
}

export const htsFormSlot = 'hts-encounter-form-slot';
export const htsEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

const CareAndTreatmentList: React.FC<CareAndTreatmentProps> = ({ patientUuid, viewMode }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const rowCount = 5;

  const forceComponentUpdate = () => setCounter(counter + 1);
  const serviceEnrolmentForm = useMemo(() => {
    return getForm('hiv', 'service_enrolment');
  }, []);

  const launchServiceEnrolmentForm = () => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: serviceEnrolmentForm?.name,
      screenSize: 'maximize',
      state: { updateParent: forceComponentUpdate, formJson: serviceEnrolmentForm },
    });
  };
  const editServiceEnrolmentEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: serviceEnrolmentForm?.name,
      encounterUuid: encounterUuid,
      state: { updateParent: forceComponentUpdate, formJson: serviceEnrolmentForm },
    });
  };
  const viewHTSEncounter = encounterUuid => {
    launchOHRIWorkSpace('ohri-forms-view-ext', {
      title: serviceEnrolmentForm?.name,
      encounterUuid: encounterUuid,
      mode: 'view',
      state: { updateParent: forceComponentUpdate, formJson: serviceEnrolmentForm },
    });
  };

  const tableHeaders = [
    { key: 'date', header: 'Date of service enrolment', isSortable: true },
    { key: 'clientDescription', header: 'Description of client' },
    { key: 'populationCategory', header: 'Population category' },
    { key: 'dateConfirmedPositive', header: 'Date confirmed positive' },
    { key: 'action', header: 'Action' },
  ];

  async function getServiceEnrolmentColumns(query: string, customRepresentation: string) {
    const { data: encounters } = await openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`);
    const sortedEncounters = encounters.results.sort(
      (firstEncounter, secondEncounter) =>
        new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
    );

    let rows = [];
    sortedEncounters.map(encounter => {
      const clientDescription = encounter.obs.find(
        observation => observation.concept.uuid === patientTypeEnrollmentConcept,
      );

      const populationCategory = encounter.obs.find(
        observation => observation.concept.uuid === studyPopulationTypeConcept,
      );

      const dateConfirmedPositive = encounter.obs.find(
        observation => observation.concept.uuid === dateOfHIVDiagnosisConcept,
      );

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
            itemText={t('editServiceEnrolmentEncounter', 'Edit')}
            onClick={e => {
              e.preventDefault();
              editServiceEnrolmentEncounter(encounter.uuid);
            }}
          />
        </OverflowMenu>
      );

      rows.push({
        id: encounter.uuid,
        date: moment(encounter.encounterDatetime).format('DD-MMM-YYYY'),
        clientDescription: clientDescription ? clientDescription.value.name.name : '--',
        populationCategory: populationCategory ? populationCategory.value.name.name : '--',
        dateConfirmedPositive: dateConfirmedPositive
          ? moment(dateConfirmedPositive.obsDatetime).format('DD-MMM-YYYY')
          : '--',
        action: encounterActionOverflowMenu,
      });
    });

    setTableRows(rows);
    setIsLoading(false);
  }

  useEffect(() => {
    let query = `encounterType=${careAndTreatmentEncounterType}&patient=${patientUuid}`;
    getServiceEnrolmentColumns(query, htsEncounterRepresentation);
  }, [counter]);

  const headerTitle = 'Service Enrolment';

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton rowCount={rowCount} />
      ) : tableRows.length > 0 ? (
        <>
          <div className={styles.newServiceEnrolmentBtn}>
            <Button
              kind="ghost"
              renderIcon={Add16}
              iconDescription="New"
              onClick={e => {
                e.preventDefault();
                launchServiceEnrolmentForm();
              }}>
              {t('add', 'New')}
            </Button>
          </div>
          <div className={styles.widgetContainer}>
            <Tabs type="container">
              <Tab id="tab-1" label="Service Enrolment">
                <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
              </Tab>
            </Tabs>
          </div>
        </>
      ) : (
        <EmptyState
          displayText={t('serviceEnrolments', 'service enrolments')}
          headerTitle={headerTitle}
          launchForm={launchServiceEnrolmentForm}
        />
      )}
    </>
  );
};

export default CareAndTreatmentList;
