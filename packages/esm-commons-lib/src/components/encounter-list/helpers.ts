import { OHRIFormSchema, SessionMode } from '@openmrs/openmrs-form-engine-lib';
import { launchForm } from '../../utils/ohri-forms-commons';
import { capitalize } from 'lodash-es';
import { OpenmrsEncounter } from '../../api/types';

type LaunchAction = 'add' | 'view' | 'edit';

export function launchEncounterForm(
  form: OHRIFormSchema,
  moduleName: string,
  action: LaunchAction = 'add',
  onFormSave: () => void,
  title?: string,
  encounterUuid?: string,
  intent: string = '*',
  workspaceWindowSize?: 'minimized' | 'maximized',
) {
  const defaultTitle = capitalize(action) + ' ' + form.name;
  launchForm(
    form,
    action === 'add' ? 'enter' : action,
    moduleName,
    title || defaultTitle,
    encounterUuid,
    intent,
    onFormSave,
    workspaceWindowSize,
  );
}

export const findEncounterLatestDateIndex = (encounters: OpenmrsEncounter[]) => {
  if (!encounters || !encounters.length) {
    return;
  }

  let latestDateIndex: number = 0;

  for (let i = 1; i < encounters?.length; i++) {
    const currentDate = new Date(encounters[i].encounterDatetime);
    const latestDate = new Date(encounters[latestDateIndex].encounterDatetime);

    if (currentDate > latestDate) {
      latestDateIndex = i;
    }
  }

  return latestDateIndex;
};
