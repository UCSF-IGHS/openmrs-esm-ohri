import { launchOHRIWorkSpace } from '../workspace/ohri-workspace-utils';

export const launchForm = (form: any, onUpdateParent?: () => void) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: form?.name,
    screenSize: 'maximize',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};
export const launchFormInEditMode = (form: any, encounterUuid: string, onUpdateParent?: () => void) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximize',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};
export const launchFormInViewMode = (form: any, encounterUuid: string, onUpdateParent?: () => void) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximize',
    mode: 'view',
    state: { updateParent: onUpdateParent, formJson: form },
    collapseSections: true,
  });
};
