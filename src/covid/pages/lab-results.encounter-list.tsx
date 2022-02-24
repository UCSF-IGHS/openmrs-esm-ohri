import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../covid.scss';
import { Tabs, Tab, Tag } from 'carbon-components-react';

import {
  covidLabOrderDate_UUID,
  covidLabOrderEncounterType_UUID,
  covidReasonsForTestingConcep_UUID,
  covidTestResultConcept_UUID,
  covidTestResultDate_UUID,
  covidTestStatusConcept_UUID,
  covidTypeofTestConcept_UUID,
} from '../../constants';

import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../components/encounter-list/encounter-list.component';

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidLabWidgetProps {
  patientUuid: string;
}

const columnsLab: EncounterListColumn[] = [
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
    key: 'labStatus',
    header: 'Status',
    getValue: encounter => {
      const status = getObsFromEncounter(encounter, covidTestStatusConcept_UUID);
      if (status == '--') {
        return '--';
      } else {
        const tagColor = status === 'Completed' ? 'green' : status === 'Cancelled' ? 'purple' : 'teal';
        return (
          <Tag type={tagColor} title={status} className={styles.statusTag}>
            {' '}
            {status}{' '}
          </Tag>
        );
      }
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
    key: 'testResultDate',
    header: 'Date of Test Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTestResultDate_UUID, true);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => {
      const baseActions = [
        {
          form: { name: 'covid_lab_test', package: 'covid' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'View Details',
          mode: 'view',
        },
        {
          form: { name: 'covid_lab_result', package: 'covid' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Add/Edit Lab Result',
          mode: 'edit',
        },
      ];
      const status = getObsFromEncounter(encounter, covidTestStatusConcept_UUID);
      if (status.includes('Pending')) {
        baseActions.push({
          form: { name: 'covid_lab_order_cancellation', package: 'covid' },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: 'Cancel Lab Order',
          mode: 'edit',
        });
      }
      return baseActions;
    },
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
      if (status == '--') {
        return '--';
      } else {
        const tagColor = status === 'Completed' ? 'green' : status === 'Cancelled' ? 'purple' : 'teal';
        return (
          <Tag type={tagColor} title={status} className={styles.statusTag}>
            {' '}
            {status}{' '}
          </Tag>
        );
      }
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
      {
        form: { name: 'covid_lab_test', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Details',
        mode: 'view',
      },
      {
        form: { name: 'covid_sample_collection', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Collect Sample',
        mode: 'edit',
      },
      {
        form: { name: 'covid_lab_result', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Add/Edit Lab Result',
        mode: 'edit',
      },
    ],
  },
];

let pendingLabOrdersFilter = encounter => {
  return getObsFromEncounter(encounter, covidTestStatusConcept_UUID) === 'Pending';
};

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
            hideFormLauncher={true}
            filter={pendingLabOrdersFilter}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default CovidLabResults;
