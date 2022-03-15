import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';
import styles from '../covid.scss';
import { openmrsFetch } from '@openmrs/esm-framework';
import { getForm } from '../../utils/forms-loader';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { OHRIFormLauncherWithIntent } from '../../components/ohri-form-launcher/ohri-form-launcher.component';
import moment from 'moment';
import DataTableSkeleton from 'carbon-components-react/lib/components/DataTableSkeleton';
import OTable from '../../components/data-table/o-table.component';
import {
  covid_Assessment_EncounterUUID,
  covidReasonsForTestingConcep_UUID,
  covidSARS_TestResultConcept_UUID,
  covidTreatementOutConcept_UUID,
  covidSpecimentTestDate_UUID,
  covidPresentSymptonsConcept_UUID,
  covidUnderComorbidityConcept_UUID,
  covidSymptosConcept_UUID,
  covidPresentSymptonsName_UUID,
  covidPatientStatusConcept_UUID,
  covidOutcomeUUID,
  covidEncounterDateTime_UUID,
} from '../../constants';

interface CovidOverviewListProps {
  patientUuid: string;
}

export const covidFormSlot = 'hts-encounter-form-slot';
export const covidEncounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

interface CovidAssessmentWidgetProps {
  patientUuid: string;
}

//Generic Component Import

import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
  getEncounterValues,
} from '../../components/encounter-list/encounter-list.component';

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Date of Assessment',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidEncounterDateTime_UUID, true);
    },
    link: {
      handleNavigate: encounter => {
        encounter.launchFormActions?.viewEncounter();
      },
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
    key: 'symptomatic',
    header: 'Presentation',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidPresentSymptonsConcept_UUID, false);
    },
  },
  {
    key: 'outcome',
    header: 'Outcome',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidOutcomeUUID);
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: encounter => [
      {
        form: { name: 'covid_case', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Assessment',
        mode: 'view',
      },
      {
        form: { name: 'covid_assessment', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'View Case',
        mode: 'view',
      },
      {
        form: { name: 'covid_assessment', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Assessment',
        mode: 'edit',
      },
      {
        form: { name: 'covid_case', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Edit Case',
        mode: 'edit',
      },
      {
        form: { name: 'covid_outcome', package: 'covid' },
        encounterUuid: encounter.uuid,
        intent: '*',
        label: 'Add/Edit Outcome',
        mode: 'edit',
      },
    ],
  },
];

const CovidAssessment: React.FC<CovidAssessmentWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('covidAssessments', 'COVID Assessment');
  const displayText = t('covidAssessments', 'COVID Assessment');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={covid_Assessment_EncounterUUID}
      form={{ package: 'covid', name: 'covid_assessment', view: 'covid_assessment_summary' }}
      forms={[
        { package: 'covid', name: 'covid_assessment', excludedIntents: ['COVID_LAB_ASSESSMENT_EMBED'] },
        { package: 'covid', name: 'covid_case', excludedIntents: [] },
      ]}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
      dropdownText="Add"
    />
  );
};

export default CovidAssessment;
