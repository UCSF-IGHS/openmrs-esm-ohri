import { launchOHRIWorkSpace } from '../workspace/ohri-workspace-utils';

export const launchForm = (form: any, onUpdateParent?: () => void, title?: string) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: title || form?.name,
    screenSize: 'maximize',
    mode: 'enter',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};
export const launchFormInEditMode = (form: any, encounterUuid: string, onUpdateParent?: () => void, title?: string) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: title || form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximize',
    mode: 'edit',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};
export const launchFormInViewMode = (form: any, encounterUuid: string, onUpdateParent?: () => void, title?: string) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: title || form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximize',
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
