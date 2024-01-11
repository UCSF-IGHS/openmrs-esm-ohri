import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './covid.scss';
import { Tabs, Tab, Tag, TabList, TabPanels, TabPanel } from '@carbon/react';
import { EncounterList, EncounterListColumn, findObs, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../index';
import { useConfig } from '@openmrs/esm-framework';
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
  const config = useConfig();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'orderDate',
        header: t('dateOfOrder', 'Date of Order'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidLabOrderDate_UUID, true);
        },
      },
      {
        key: 'reasonsForTesting',
        header: t('reasonsForTesting', 'Reason for testing'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidReasonsForTestingConcep_UUID);
        },
      },
      {
        key: 'testType',
        header: t('testType', 'Test Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidTypeofTestConcept_UUID);
        },
      },
      {
        key: 'labStatus',
        header: t('status', 'Status'),
        getValue: (encounter) => {
          const status = getObsFromEncounter(encounter, config.obsConcepts.covidTestStatusConcept_UUID);
          const statusObs = findObs(encounter, config.obsConcepts.covidTestStatusConcept_UUID);
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
          return pcrResult && pcrResult != '--'
            ? pcrResult
            : getObsFromEncounter(encounter, config.obsConcepts.rapidTestResult);
        },
      },
      {
        key: 'testResultDate',
        header: t('dateOfTestResult', 'Date of Test Result'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidTestResultDate_UUID, true);
        },
      },
      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: config.formNames.CovidLabTestFormName, package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: config.formNames.CovidLabResultFormName, package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('addEditResult', 'Add/Edit Lab Result'),
              mode: 'edit',
            },
          ];
          const status = getObsFromEncounter(encounter, config.obsConcepts.covidTestStatusConcept_UUID);
          if (status.includes('Pending')) {
            baseActions.push({
              form: { name: config.formNames.CovidLabCancellationFormName, package: 'covid' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('cancelLabOrder', 'Cancel Lab Order'),
              mode: 'edit',
            });
          }
          if (status.includes('Pending')) {
            baseActions.push({
              form: { name: config.formNames.CovidSampleCollectionFormName, package: 'covid' },
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
          return getObsFromEncounter(encounter, config.obsConcepts.covidLabOrderDate_UUID, true);
        },
      },
      {
        key: 'testType',
        header: t('testType', 'Test Type'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidTypeofTestConcept_UUID);
        },
      },
      {
        key: 'fowardLabreference',
        header: t('fowardLabreference', 'Fowarded to Reference Lab'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, config.obsConcepts.covidTestResultConcept_UUID);
        },
      },
      {
        key: 'labStatus',
        header: t('status', 'Status'),
        getValue: (encounter) => {
          const status = getObsFromEncounter(encounter, config.obsConcepts.covidTestStatusConcept_UUID);
          const statusObs = findObs(encounter, config.obsConcepts.covidTestStatusConcept_UUID);
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
            form: { name: config.formNames.CovidLabTestFormName, package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('viewDetails', 'View Details'),
            mode: 'view',
          },
          {
            form: { name: config.formNames.CovidSampleCollectionFormName, package: 'covid' },
            encounterUuid: encounter.uuid,
            intent: '*',
            label: t('collectSample', 'Collect Sample'),
            mode: 'edit',
          },
          {
            form: { name: config.formNames.CovidLabResultFormName, package: 'covid' },
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
    return getObsFromEncounter(encounter, config.obsConcepts.covidTestStatusConcept_UUID) === 'Pending';
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
              encounterType={config.encounterTypes.covidLabOrderEncounterType_UUID}
              formList={[
                { name: config.formNames.CovidLabOrderFormName, excludedIntents: ['COVID_LAB_ORDER_EMBED'] },
                { name: config.formNames.CovidLabResultFormName, excludedIntents: ['COVID_LAB_RESULT_EMBED'] },
                { name: config.formNames.CovidLabTestFormName, excludedIntents: ['*'] },
                {
                  name: config.formNames.CovidLabCancellationFormName,
                  excludedIntents: ['*', 'COVID_LAB_CANCELLATION_EMBED'],
                },
                {
                  name: config.formNames.CovidSampleCollectionFormName,
                  excludedIntents: ['*', 'COVID_SAMPLE_COLLECTION_EMBED'],
                },
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
              encounterType={config.encounterTypes.covidLabOrderEncounterType_UUID}
              formList={[
                { name: config.formNames.CovidLabTestFormName },
                { name: config.formNames.CovidLabTestFormName },
                { name: config.formNames.CovidLabResultFormName },
                { name: config.formNames.CovidLabCancellationFormName },
                { name: config.formNames.CovidSampleCollectionFormName },
                { name: config.formNames.CovidLabOrderFormName },
              ]}
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
