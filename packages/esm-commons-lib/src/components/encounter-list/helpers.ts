import { OHRIFormSchema } from '@openmrs/openmrs-form-engine-lib';
import { capitalize } from 'lodash-es';
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
  const defaultTitle = capitalize(action) + ' ' + form?.name;
  console.log("---helper form", form)
  console.log("---helper intent", intent)
  console.log("---helper title", title)

  launchPatientWorkspace('patient-form-entry-workspace', {
    workspaceTitle: form.name,
    screenSize: 'maximized',
    width: 'wider',
    mutateform: mutateform,
    formInfo: {
      encounterUuid,
      formUuid: form.uuid,
      patientUuid: patientUuid,
      visitTypeUuid: '',
      visitUuid: '',
      visitStartDatetime: '',
      visitStopDatetime: '',
    },
  });
}
