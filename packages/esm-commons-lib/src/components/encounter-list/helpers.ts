import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';
import { launchPatientWorkspace } from '@openmrs/esm-patient-common-lib';
import { type FormSchema } from '@openmrs/openmrs-form-engine-lib';

type LaunchAction = 'add' | 'view' | 'edit' | 'embedded-view';

export function launchEncounterForm(
  form: FormSchema,
  moduleName: string,
  action: LaunchAction = 'add',
  onFormSave: () => void,
  title?: string,
  encounterUuid?: string,
  intent: string = '*',
  workspaceWindowSize?: 'minimized' | 'maximized',
  patientUuid?: string,
) {
  launchPatientWorkspace('patient-form-entry-workspace', {
    workspaceTitle: form.name,
    mutateForm: onFormSave,
    formInfo: {
      encounterUuid,
      formUuid: form.name,
      patientUuid: patientUuid,
      visitTypeUuid: '',
      visitUuid: '',
      visitStartDatetime: '',
      visitStopDatetime: '',
      additionalProps: {
        mode: action === 'add' ? 'enter' : action,
        formSessionIntent: intent,
        openClinicalFormsWorkspaceOnFormClose: false,
      },
    },
  });
}

export function deleteEncounter(encounterUuid: string, abortController: AbortController) {
  return openmrsFetch(`${restBaseUrl}/encounter/${encounterUuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: abortController.signal,
  });
}
