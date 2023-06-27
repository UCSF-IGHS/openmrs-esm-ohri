import React, { useEffect, useState } from 'react';
import { OverflowMenu, OverflowMenuItem, InlineLoading, DataTableSkeleton } from '@carbon/react';
import { applyFormIntent } from '@openmrs/openmrs-form-engine-lib';
import moment from 'moment';
import { AddPatientToListOverflowMenuItem } from '../modals/add-patient-to-list-modal.component';
import { fetchPatientLastEncounter } from '../../api/api';
import { changeWorkspaceContext } from '@openmrs/esm-patient-common-lib';
import { launchForm, launchFormInEditMode } from '../../utils/ohri-forms-commons';
import { navigate } from '@openmrs/esm-framework';

interface PatientMetaConfig {
  location: { name: string };
  encounterType: string;
  isDynamicCohort: boolean;
  launchableFormProps: Record<string, any>;
  moduleName: string;
  addPatientToListOptions: { isEnabled: boolean; excludeCohorts?: Array<string>; displayText: string };
}

export interface PatientListColumn {
  key: string;
  header: string;
  getValue: (patient: any) => string;
  link?: any;
  index?: number;
}

export const LaunchableFormMenuItem = ({
  patientUuid,
  launchableForm,
  form,
  encounterType,
  patientUrl,
  moduleName,
}) => {
  const [actionText, setActionText] = useState(launchableForm.actionText);
  const [encounterUuid, setEncounterUuid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const continueEncounterActionText = launchableForm.actionText || 'Continue encounter ';

  useEffect(() => {
    if (launchableForm.editLatestEncounter && encounterType && !encounterUuid) {
      setIsLoading(true);
      fetchPatientLastEncounter(patientUuid, encounterType).then((lastHtsEncounter) => {
        if (lastHtsEncounter) {
          setActionText(continueEncounterActionText);
          setEncounterUuid(lastHtsEncounter.uuid);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <InlineLoading style={{ margin: '0 auto', width: '16px' }} />
      ) : (
        <OverflowMenuItem
          itemText={actionText}
          onClick={() => {
            changeWorkspaceContext(patientUuid);
            launchForm(form, encounterUuid ? 'edit' : 'enter', moduleName, form.name, encounterUuid, null, null);
            navigate({ to: patientUrl });
          }}
        />
      )}
    </>
  );
};

export function consolidatatePatientMeta(rawPatientMeta, form, config: PatientMetaConfig) {
  const { isDynamicCohort, location, encounterType, launchableFormProps, moduleName, addPatientToListOptions } = config;
  const patientUuid = !isDynamicCohort ? rawPatientMeta.patient.uuid : rawPatientMeta.person.uuid;
  return {
    timeAddedToList: !isDynamicCohort ? moment(rawPatientMeta.startDate).format('LL') : null,
    waitingTime: !isDynamicCohort ? moment(rawPatientMeta.startDate).fromNow() : null,
    location: location && location.name,
    phoneNumber: '0700xxxxxx',
    hivResult: 'None',
    actions: (
      <OverflowMenu flipped>
        {form ? (
          <LaunchableFormMenuItem
            patientUuid={patientUuid}
            launchableForm={launchableFormProps}
            form={applyFormIntent(launchableFormProps.intent, form)}
            encounterType={launchableFormProps.encounterType || encounterType}
            key={patientUuid}
            patientUrl={rawPatientMeta.patientUrl}
            moduleName={moduleName}
          />
        ) : (
          <></>
        )}
        {addPatientToListOptions?.isEnabled && (
          <AddPatientToListOverflowMenuItem
            patientUuid={patientUuid}
            displayText={addPatientToListOptions.displayText}
            excludeCohorts={addPatientToListOptions?.excludeCohorts || []}
          />
        )}
      </OverflowMenu>
    ),
  };
}

export const filterPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter((patient) => patient.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1);
};

export const columns: PatientListColumn[] = [
  {
    key: 'name',
    header: 'Name',
    getValue: (patient) => {
      return patient.name;
    },
    link: {
      getUrl: (patient) => patient.url,
    },
  },
  {
    key: 'timeAddedToList',
    header: 'Time Added To List',
    getValue: (patient) => {
      return patient.timeAddedToList;
    },
  },
  {
    key: 'waitingTime',
    header: 'Waiting Time',
    getValue: (patient) => {
      return patient.waitingTime;
    },
  },
  {
    key: 'gender',
    header: 'Sex',
    getValue: (patient) => {
      return patient.gender;
    },
  },
  {
    key: 'location',
    header: 'Location',
    getValue: (patient) => {
      return patient.location;
    },
  },
  {
    key: 'age',
    header: 'Age',
    getValue: (patient) => {
      return patient.age;
    },
  },
  {
    key: 'phoneNumber',
    header: 'Phone Number',
    getValue: (patient) => {
      return patient.phoneNumber;
    },
  },
  {
    key: 'hivResult',
    header: 'HIV Result',
    getValue: (patient) => {
      return patient.hivResult;
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    getValue: (patient) => {
      return patient.actions;
    },
  },
];
