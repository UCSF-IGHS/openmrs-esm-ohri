import { launchPatientWorkspace } from '@openmrs/esm-patient-common-lib';

type LaunchAction = 'add' | 'view' | 'edit';

export function launchEncounterForm(
  form: any,
  moduleName: string,
  action: LaunchAction = 'add',
  onFormSave: () => void,
  title?: string,
  encounterUuid?: string,
  intent: string = '*',
  workspaceWindowSize?: 'minimized' | 'maximized',
  patientUuid?: string,
  mutateform?: () => void,
) {
  launchPatientWorkspace('patient-form-entry-workspace', {
    workspaceTitle: form.name,
    workspaceWindowState: 'maximized',
    mode: action,
    formSessionIntent: intent,
    formInfo: {
      encounterUuid,
      formUuid: form.uuid,
      patientUuid: patientUuid,
      visitTypeUuid: '',
      visitUuid: '',
      visitStartDatetime: '',
      visitStopDatetime: '',
      mode: 'view',
    },
  });
}
