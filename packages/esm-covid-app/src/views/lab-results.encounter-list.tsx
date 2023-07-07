import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './covid.scss';
import { Tabs, Tab, Tag, TabList, TabPanels, TabPanel } from '@carbon/react';
import {
  covidLabOrderDate_UUID,
  covidLabOrderEncounterType_UUID,
  covidReasonsForTestingConcep_UUID,
  covidTestResultConcept_UUID,
  covidTestResultDate_UUID,
  covidTestStatusConcept_UUID,
  covidTypeofTestConcept_UUID,
} from '../constants';
import { EncounterList, EncounterListColumn, findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../index';
export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

const pcrTestResult = '3f4ee14b-b4ab-4597-9fe9-406883b63d76';
const rapidTestResult = 'cbcbb029-f11f-4437-9d53-1d0f0a170433';
const statusColorMap = {
  '1118AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'green', // not done
  '1267AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'green', // completed
  '165170AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'purple', // cancelled
  '162866AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 'blue', // pending
};
interface CovidLabWidgetProps {
  patientUuid: string;
}

const CovidLabResults: React.FC<CovidLabWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'orderDate',
        header: t('dateOfOrder', 'Date of Order'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidLabOrderDate_UUID, true);
        },
      },
      {
        key: 'reasonsForTesting',
        header: t('reasonsForTesting', 'Reason for testing'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidReasonsForTestingConcep_UUID);
        },
      },
      {
        key: 'testType',
        header: t('testType', 'Test Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidTypeofTestConcept_UUID);
        },
      },
      {
        key: 'labStatus',
        header: t('status', 'Status'),
        getValue: (encounter) => {
          const status = getObsFromEncounter(encounter, covidTestStatusConcept_UUID);
          const statusObs = findObs(encounter, covidTestStatusConcept_UUID);
          if (status == '--') {
            return '--';
          } else {
            return (
              <Tag type={statusColorMap[statusObs?.value?.uuid]} title={status} className={styles.statusTag}>
                {status}
              </Tag>
            );
          }
        },
      },
      {
        key: 'lastTestResult',
        header: t('testResult', 'Test Result'),
        getValue: (encounter) => {
          const pcrResult = getObsFromEncounter(encounter, pcrTestResult);
          return pcrResult && pcrResult != '--' ? pcrResult : getObsFromEncounter(encounter, rapidTestResult);
        },
      },
      {
        key: 'testResultDate',
        header: t('dateOfTestResult', 'Date of Test Result'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidTestResultDate_UUID, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'covid_lab_test', package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'covid_lab_result', package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('addEditResult', 'Add/Edit Lab Result'),
              mode: 'edit',
            },
          ];
          const status = getObsFromEncounter(encounter, covidTestStatusConcept_UUID);
          if (status.includes('Pending')) {
            baseActions.push({
              form: { name: 'covid_lab_order_cancellation', package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('cancelLabOrder', 'Cancel Lab Order'),
              mode: 'edit',
            });
          }
          if (status.includes('Pending')) {
            baseActions.push({
              form: { name: 'covid_sample_collection', package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('collectSample', 'Collect Sample'),
              mode: 'edit',
            });
          }
          return baseActions;
        },
      },
    ],
    [],
  );

  const columnsPending: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'orderDate',
        header: t('dateOfOrder', 'Date of Order'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidLabOrderDate_UUID, true);
        },
      },
      {
        key: 'testType',
        header: t('testType', 'Test Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidTypeofTestConcept_UUID);
        },
      },
      {
        key: 'fowardLabreference',
        header: t('fowardLabreference', 'Fowarded to Reference Lab'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, covidTestResultConcept_UUID);
        },
      },
      {
        key: 'labStatus',
        header: t('status', 'Status'),
        getValue: (encounter) => {
          const status = getObsFromEncounter(encounter, covidTestStatusConcept_UUID);
          const statusObs = findObs(encounter, covidTestStatusConcept_UUID);
          if (status == '--') {
            return '--';
          } else {
            return (
              <Tag type={statusColorMap[statusObs?.value?.uuid]} title={status} className={styles.statusTag}>
                {status}
              </Tag>
            );
          }
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => [
          {
            form: { name: 'covid_lab_test', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: 'covid_sample_collection', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('collectSample', 'Collect Sample'),
            mode: 'edit',
          },
          {
            form: { name: 'covid_lab_result', package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('addEditResult', 'Add/Edit Lab Result'),
            mode: 'edit',
          },
        ],
      },
    ],
    [],
  );

  let pendingLabOrdersFilter = (encounter) => {
    return getObsFromEncounter(encounter, covidTestStatusConcept_UUID) === 'Pending';
  };

  const headerTitle = t('covidLabResults', 'Lab Tests');
  const displayText = t('covidLabResults', 'Lab Tests');
  const headerTitlePending = t('covidLabResults', 'Pending Lab Orders');
  const displayTextPending = t('covidLabResults', 'Pending Lab Orders');

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab>{t('labTests', 'Lab Tests')}</Tab>
          <Tab>{t('pendingLabOrders', 'Pending Lab Orders')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EncounterList
              patientUuid={patientUuid}
              encounterType={covidLabOrderEncounterType_UUID}
              formList={[
                { name: 'COVID Lab Order Form', excludedIntents: ['COVID_LAB_ORDER_EMBED'] },
                { name: 'COVID Lab Result Form', excludedIntents: [] },
              ]}
              columns={columnsLab}
              description={displayText}
              headerTitle={headerTitle}
              launchOptions={{
                displayText: 'Add',
                moduleName: moduleName,
              }}
            />
          </TabPanel>
          <TabPanel>
            <EncounterList
              patientUuid={patientUuid}
              encounterType={covidLabOrderEncounterType_UUID}
              formList={[{ name: 'COVID Lab Test' }]}
              columns={columnsPending}
              description={headerTitlePending}
              headerTitle={displayTextPending}
              launchOptions={{
                displayText: 'Add',
                moduleName: moduleName,
                hideFormLauncher: true,
              }}
              filter={pendingLabOrdersFilter}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default CovidLabResults;
