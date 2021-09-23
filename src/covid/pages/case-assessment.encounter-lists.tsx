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
  covidPatientStatusUUID,
  covidOutcomeUUID,
  covidReasonsForTestingUUID,
  covidTestResultUUID,
  covidTestDateUUID,
  covidTestTypeUUID,
  covidSARS_TestResult,
  covidTreatmenOutConceptName_UUID,
  covidSpecimentTestDate_UUID,
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
} from '../../components/encounter-list/encounter-list.component';

const columns: EncounterListColumn[] = [
  {
    key: 'encounterDate',
    header: 'Encounter Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidSpecimentTestDate_UUID, true);
    },
  },
  {
    key: 'reasonsForTesting',
    header: 'Reason for testing',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidReasonsForTestingUUID);
    },
  },
  {
    key: 'testDate',
    header: 'Test Date',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTestDateUUID, true);
    },
  },
  {
    key: 'lastTestResult',
    header: 'Test Result',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidSARS_TestResult);
    },
  },
  {
    key: 'outcome',
    header: 'Outcome',
    getValue: encounter => {
      return getObsFromEncounter(encounter, covidTreatmenOutConceptName_UUID);
    },
  },
];

const CovidAssessment: React.FC<CovidAssessmentWidgetProps> = ({ patientUuid }) => {
  console.info('columns: ', columns);
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={covid_Assessment_EncounterUUID}
      form={{ package: 'covid', name: 'covid_assessment' }}
      columns={columns}
      description="clinical visit encounters"
      headerTitle="Covid Assessment"
    />
  );
};

export default CovidAssessment;
