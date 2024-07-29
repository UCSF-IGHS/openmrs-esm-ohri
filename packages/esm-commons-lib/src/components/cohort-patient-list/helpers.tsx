import React, { useEffect, useState } from 'react';
import { OverflowMenu, OverflowMenuItem, InlineLoading } from '@carbon/react';
import { applyFormIntent } from '@openmrs/openmrs-form-engine-lib';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AddPatientToListOverflowMenuItem } from '../modals/add-patient-to-list-modal.component';
import { launchForm } from '../../utils/ohri-forms-commons';
import { navigate, WorkspaceContainer } from '@openmrs/esm-framework';
import { useLastEncounter } from '../../hooks/useLastEncounter';

interface PatientMetaConfig {
  location: { name: string };
  encounterType: string;
  isDynamicCohort: boolean;
  launchableFormProps: Record<string, any>;
  moduleName: string;
  addPatientToListOptions: { isEnabled: boolean; excludeCohorts?: Array<string>; displayText: string };
  viewPatientProgramSummary?: boolean;
  viewTptPatientProgramSummary?: boolean;
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
  const continueEncounterActionText = launchableForm.actionText || 'Continue encounter ';
  const { lastEncounter, isLoading } = useLastEncounter(patientUuid, encounterType);

  useEffect(() => {
    if (launchableForm.editLatestEncounter && encounterType && !encounterUuid) {
      if (!isLoading && lastEncounter) {
        setActionText(continueEncounterActionText);
        setEncounterUuid(lastEncounter.uuid);
      }
    }
  }, [
    continueEncounterActionText,
    encounterType,
    encounterUuid,
    launchableForm.editLatestEncounter,
    patientUuid,
    lastEncounter,
    isLoading,
  ]);

  return (
    <>
      {isLoading ? (
        <InlineLoading style={{ margin: '0 auto', width: '16px' }} />
      ) : (
        <>
          <OverflowMenuItem
            itemText={actionText}
            onClick={() => {
              launchForm(form, encounterUuid ? 'edit' : 'enter', moduleName, form.name, encounterUuid, null, null);
              navigate({ to: patientUrl });
            }}
          />
          <WorkspaceContainer contextKey={`patient/${patientUuid}`} />
        </>
      )}
    </>
  );
};

export const ViewSummaryMenuItem = ({ patientUuid, ViewSummary, encounterType }) => {
  const [actionText, setActionText] = useState(ViewSummary.actionText);
  const [encounterUuid, setEncounterUuid] = useState(null);
  const viewSummaryActionText = ViewSummary.actionText || 'View Summary ';
  const { lastEncounter, isLoading } = useLastEncounter(patientUuid, encounterType);

  useEffect(() => {
    if (ViewSummary.editLatestEncounter && encounterType && !encounterUuid) {
      if (!isLoading && lastEncounter) {
        setActionText(viewSummaryActionText);
        setEncounterUuid(lastEncounter.uuid);
      }
    }
  }, [
    ViewSummary.editLatestEncounter,
    encounterType,
    encounterUuid,
    isLoading,
    lastEncounter,
    patientUuid,
    viewSummaryActionText,
  ]);

  return (
    <>
      {isLoading ? (
        <InlineLoading style={{ margin: '0 auto', width: '16px' }} />
      ) : (
        <OverflowMenuItem
          itemText={actionText}
          onClick={() => {
            navigate({
              to: `/openmrs/spa/patient/${patientUuid}/chart/tb-patient-summary`,
            });
          }}
        />
      )}
    </>
  );
};

export const ViewTptSummaryMenuItem = ({ patientUuid, ViewTptSummary, encounterType }) => {
  const [actionText, setActionText] = useState(ViewTptSummary.actionText);
  const [encounterUuid, setEncounterUuid] = useState(null);
  const viewTptSummaryActionText = ViewTptSummary.actionText || 'View Summary ';
  const { lastEncounter, isLoading } = useLastEncounter(patientUuid, encounterType);

  useEffect(() => {
    if (ViewTptSummary.editLatestEncounter && encounterType && !encounterUuid) {
      if (!isLoading && lastEncounter) {
        setActionText(viewTptSummaryActionText);
        setEncounterUuid(lastEncounter.uuid);
      }
    }
  }, [
    ViewTptSummary.editLatestEncounter,
    encounterType,
    patientUuid,
    encounterUuid,
    viewTptSummaryActionText,
    isLoading,
    lastEncounter,
  ]);

  return (
    <>
      {isLoading ? (
        <InlineLoading style={{ margin: '0 auto', width: '16px' }} />
      ) : (
        <OverflowMenuItem
          itemText={actionText}
          onClick={() => {
            navigate({
              to: `/openmrs/spa/patient/${patientUuid}/chart/tpt-patient-summary`,
            });
          }}
        />
      )}
    </>
  );
};

export function consolidatatePatientMeta(rawPatientMeta, form, config: PatientMetaConfig) {
  const {
    isDynamicCohort,
    location,
    encounterType,
    launchableFormProps,
    moduleName,
    addPatientToListOptions,
    viewPatientProgramSummary,
    viewTptPatientProgramSummary,
  } = config;
  const patientUuid = !isDynamicCohort ? rawPatientMeta.patient.uuid : rawPatientMeta.patient.person.uuid;
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  return {
    timeAddedToList: !isDynamicCohort ? dayjs(rawPatientMeta.startDate).format('LL') : null,
    waitingTime: !isDynamicCohort ? dayjs(rawPatientMeta.startDate).fromNow() : null,
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
        {viewTptPatientProgramSummary ? (
          <ViewTptSummaryMenuItem
            patientUuid={patientUuid}
            ViewTptSummary={launchableFormProps}
            encounterType={launchableFormProps.encounterType || encounterType}
            key={patientUuid}
          />
        ) : (
          <></>
        )}
        {viewPatientProgramSummary ? (
          <ViewSummaryMenuItem
            patientUuid={patientUuid}
            ViewSummary={launchableFormProps}
            encounterType={launchableFormProps.encounterType || encounterType}
            key={patientUuid}
          />
        ) : (
          <></>
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
