import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../covid.scss';
import { Tabs, Tab, Tag } from 'carbon-components-react';
import EmptyState from '../../components/empty-state/empty-state.component';
import {
  covidClientsWithPendingLabResults,
  covidLabOrderDate_UUID,
  covidLabOrderEncounterType_UUID,
  covidReasonsForTestingConcep_UUID,
  covidTestResultConcept_UUID,
  covidTestResultUUID,
  covidTestStatusConcept_UUID,
  covidTestTypeUUID,
  covidTypeofTestConcept_UUID,
  covid_Assessment_EncounterUUID,
} from '../../constants';

interface OverviewListProps {
  patientUuid: string;
}

interface CovidOverviewListProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidLabWidgetProps {
  patientUuid: string;
}

//Generic Component Import
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
  EncounterCustomAction,
} from '../../components/encounter-list/encounter-list.component';

const columnsLab: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of Lab Test',
    getValue: encounter => {
      return getEncounterValues(encounter, 'encounterDatetime', true);
    },
    link: {
      handleNavigate: encounter => {
        encounter.launchFormActions?.viewEncounter();
      },
    },
  },
  {
    key: 'orderDate',
    header: 'Date of Order',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidLabOrderDate_UUID, true);
    },
  },
  {
    key: 'reasonsForTesting',
    header: 'Reason for testing',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidReasonsForTestingConcep_UUID);
    },
  },
  {
    key: 'testType',
    header: 'Test Type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTypeofTestConcept_UUID);
    },
  },
  {
    key: 'lastTestResult',
    header: 'Test Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTestResultConcept_UUID);
    },
  },
  {
    key: 'labStatus',
    header: 'Status',
    getValue: encounter => {
      const status = getObsFromEncounter(encounter, covidTestStatusConcept_UUID);
      const tagColor = status === 'Completed' ? 'green' : status === 'Canclled' ? 'purple' : 'teal';
      return (
        <Tag type={tagColor} title={status}>
          {' '}
          {status}{' '}
        </Tag>
      );
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const columnsPending: EncounterListColumn[] = [
  {
    key: 'orderDate',
    header: 'Date of Order',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidLabOrderDate_UUID, true);
    },
  },
  {
    key: 'testType',
    header: 'Test Type',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTypeofTestConcept_UUID);
    },
  },
  {
    key: 'fowardLabreference',
    header: 'Fowarded to Reference Lab',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTestResultConcept_UUID);
    },
  },
  {
    key: 'labStatus',
    header: 'Status',
    getValue: encounter => {
      const status = getObsFromEncounter(encounter, covidTestStatusConcept_UUID);
      const tagColor = status === 'Completed' ? 'green' : status === 'Canclled' ? 'purple' : 'teal';
      return (
        <Tag type={tagColor} title={status}>
          {' '}
          {status}{' '}
        </Tag>
      );
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: () => {},
  },
];

const customActionsPending: EncounterCustomAction[] = [
  {
    displayText: 'View Lab Test',
    form: {
      package: 'covid',
      name: 'covid_lab_test',
      mode: 'view',
    },
  },
  {
    displayText: 'Edit Lab Result',
    form: {
      package: 'covid',
      name: 'covid_lab_result',
      mode: 'edit',
    },
  },
  {
    displayText: 'Cancel Lab Order',
    form: {
      package: 'covid',
      name: 'covid_lab_order_cancellation',
      mode: 'edit',
    },
    isDisabled: encounter => {
      return getObsFromEncounter(encounter, covidTestStatusConcept_UUID) === 'Pending';
    },
  },
];

const CovidLabResults: React.FC<CovidLabWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('covidLabResults', 'Lab Tests');
  const displayText = t('covidLabResults', 'Lab Tests');
  const headerTitlePending = t('covidLabResults', 'Pending Lab Orders');
  const displayTextPending = t('covidLabResults', 'Pending Lab Orders');

  return (
    <div className={styles.tabContainer}>
      <Tabs type="container">
        <Tab label="Lab Tests">
          <EncounterList
            patientUuid={patientUuid}
            encounterUuid={covidLabOrderEncounterType_UUID}
            form={{ package: 'covid', name: 'covid_lab_order' }}
            forms={[
              { package: 'covid', name: 'covid_lab_order', excludedIntents: ['COVID_LAB_ORDER_EMBED'] },
              { package: 'covid', name: 'covid_lab_result', excludedIntents: [] },
            ]}
            columns={columnsLab}
            description={displayText}
            headerTitle={headerTitle}
            dropdownText="Add"
          />
        </Tab>
        <Tab label="Pending Lab Orders">
          <EncounterList
            patientUuid={patientUuid}
            encounterUuid={covidLabOrderEncounterType_UUID}
            form={{ package: 'covid', name: 'covid_lab_test' }}
            columns={columnsPending}
            description={headerTitlePending}
            headerTitle={displayTextPending}
            dropdownText="Add"
            customActions={customActionsPending}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CovidLabResults;
