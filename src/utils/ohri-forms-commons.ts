import { launchOHRIWorkSpace } from '../workspace/ohri-workspace-utils';

export const launchForm = (form: any, onUnpdateParent?: () => void) => {
  console.log(form.name);
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: form?.name,
    screenSize: 'maximize',
    state: { updateParent: onUnpdateParent, formJson: form },
  });
};
export const launchFormInEditMode = (form: any, encounterUuid: string, onUnpdateParent?: () => void) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximize',
    state: { updateParent: onUnpdateParent, formJson: form },
  });
};
export const launchFormInViewMode = (form: any, encounterUuid: string, onUnpdateParent?: () => void) => {
  launchOHRIWorkSpace('ohri-forms-view-ext', {
    title: form.name,
    encounterUuid: encounterUuid,
    screenSize: 'maximize',
    mode: 'view',
    state: { updateParent: onUnpdateParent, formJson: form },
  });
};
