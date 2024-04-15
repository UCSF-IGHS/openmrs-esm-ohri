import { launchPatientWorkspace } from '@openmrs/esm-patient-common-lib';
import { OHRIFormSchema } from '@openmrs/openmrs-form-engine-lib';

type LaunchAction = 'add' | 'view' | 'edit' | 'embedded-view';

export function launchEncounterForm(
  form: OHRIFormSchema,
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
    mutateform: mutateform,
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
      },
    },
  });
}
