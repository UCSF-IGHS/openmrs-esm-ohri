import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyState from '../../components/empty-state/empty-state.component';
import styles from '../covid.scss';
import { openmrsFetch } from '@openmrs/esm-framework';
import { getForm } from '../../utils/forms-loader';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { OHRIFormLauncherWithIntent } from '../../components/ohri-form-launcher/ohri-form-laucher.componet';
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
      return getEncounterValues(encounter, 'encounterDatetime', true);
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
    header: 'Symptomatic',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidPresentSymptonsConcept_UUID, false, true);
    },
  },
  {
    key: 'testDate',
    header: 'Co-morbidity',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidUnderComorbidityConcept_UUID, false, true);
    },
  },
  {
    key: 'lastTestResult',
    header: 'Test Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidSARS_TestResultConcept_UUID);
    },
  },
  {
    key: 'outcome',
    header: 'Status',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidPatientStatusConcept_UUID);
    },
  },
];

const CovidAssessment: React.FC<CovidAssessmentWidgetProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const headerTitle = t('covidAssessments', 'Covid Assessment');
  const displayText = t('covidAssessments', 'Covid Assessment');
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={covid_Assessment_EncounterUUID}
      form={{ package: 'covid', name: 'covid_assessment' }}
      columns={columns}
      description={displayText}
      headerTitle={headerTitle}
    />
  );
};

export default CovidAssessment;
