import { launchOHRIWorkSpace } from '../workspace/ohri-workspace-utils';

export const launchForm = (form: any, onUpdateParent?: () => void, title?: string) => {
  launchOHRIWorkSpace({
    title: title || form?.name,
    screenSize: 'minimized',
    mode: 'enter',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};
export const launchFormInEditMode = (form: any, encounterUuid: string, onUpdateParent?: () => void, title?: string) => {
  launchOHRIWorkSpace({
    title: title || form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximized',
    mode: 'edit',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};
export const launchFormInViewMode = (form: any, encounterUuid: string, onUpdateParent?: () => void, title?: string) => {
  launchOHRIWorkSpace({
    title: title || form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximized',
    mode: 'view',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};

export const launchFormWithCustomTitle = (
  form: any,
  title: string,
  mode: string,
  encounterUuid: string,
  onUpdateParent?: () => void,
) => {
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
