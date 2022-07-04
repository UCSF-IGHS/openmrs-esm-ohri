/* eslint-disable no-debugger, no-console */
import { launchOHRIWorkSpace } from '../workspace/ohri-workspace-utils';

export const launchForm = (form: any, onUpdateParent?: () => void, title?: string, workspaceName?: string) => {
  launchOHRIWorkSpace({
    title: title || form?.name,
    screenSize: 'maximized',
    mode: 'enter',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
    workspaceName,
  });
};
export const launchFormInEditMode = (
  form: any,
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
  });
};
export const launchFormInViewMode = (
  form: any,
  encounterUuid: string,
  onUpdateParent?: () => void,
  title?: string,
  workspaceName?: string,
) => {
  console.log('Commons launch form in view mode');
  launchOHRIWorkSpace({
    title: title || form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximized',
    mode: 'view',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
    workspaceName,
  });
};

export const launchFormWithCustomTitle = (
  form: any,
  title: string,
  mode: string,
  encounterUuid: string,
  onUpdateParent?: () => void,
) => {
  console.log('commons - launchformwithcustomtitle');
  switch (mode) {
    case 'edit':
      launchFormInEditMode(form, encounterUuid, onUpdateParent, title);
      break;
    case 'view':
      launchFormInViewMode(form, encounterUuid, onUpdateParent, title);
      break;
    default:
      launchForm(form, onUpdateParent, title);
  }
};
