import { OHRIFormSchema, SessionMode } from '@openmrs/openmrs-form-engine-lib';
import { launchOHRIWorkSpace } from '../workspace/ohri-workspace-utils';

export const launchForm = (
  form: OHRIFormSchema,
  mode: SessionMode = 'enter',
  moduleName: string,
  title?: string,
  encounterUuid?: string,
  intent?: string,
  onUpdateParent?: () => void,
) => {
  launchOHRIWorkSpace({
    title: title || form?.name,
    screenSize: 'maximized',
    mode,
    encounterUuid,
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
    moduleName,
    intent,
  });
};

// @deprecated
export const launchFormInEditMode = (
  form: any,
  moduleName: string,
  encounterUuid: string,
  onUpdateParent?: () => void,
  title?: string,
  workspaceName?: string,
) => {
  launchOHRIWorkSpace({
    title: title || form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximized',
    mode: 'edit',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
    workspaceName,
    moduleName,
  });
};

// @deprecated
export const launchFormInViewMode = (
  form: any,
  moduleName: string,
  encounterUuid: string,
  onUpdateParent?: () => void,
  title?: string,
  workspaceName?: string,
) => {
  launchOHRIWorkSpace({
    title: title || form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximized',
    mode: 'view',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
    workspaceName,
    moduleName,
  });
};

// @deprecated
export const launchFormWithCustomTitle = (
  form: any,
  moduleName: string,
  title: string,
  mode: string,
  encounterUuid: string,
  onUpdateParent?: () => void,
) => {
  switch (mode) {
    case 'edit':
      launchFormInEditMode(form, moduleName, encounterUuid, onUpdateParent, title);
      break;
    case 'view':
      launchFormInViewMode(form, moduleName, encounterUuid, onUpdateParent, title);
      break;
    default:
      launchForm(form, 'enter', moduleName, title, null, null, onUpdateParent);
  }
};
