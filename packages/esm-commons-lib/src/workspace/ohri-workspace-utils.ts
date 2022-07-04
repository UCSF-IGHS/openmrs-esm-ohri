/* eslint-disable no-debugger, no-console */
import { getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { BehaviorSubject } from 'rxjs';
import { closeWorkspace, launchPatientWorkspace, registerWorkspace } from '@openmrs/esm-patient-common-lib';
import { OHRIForm, SessionMode } from '@ohri/openmrs-ohri-form-engine-lib';
export interface WorkspaceContextProps {
  title: string;
  encounterUuid?: string;
  state?: any;
  mode?: SessionMode;
  screenSize?: string;
  collapseSections?: Boolean;
  workspaceName?: string;
}
const workspaceMeta = {
  featureName: 'ohri-forms-workspace-item',
  moduleName: '@openmrs/esm-ohri-app',
};

let counter = 0;

export const launchOHRIWorkSpace = (props: WorkspaceContextProps) => {
  console.log('Workspace dede!');
  console.log({ props });
  const workspaceName = props.workspaceName || 'ohri-forms-' + counter++;

  const close = () => {
    return closeWorkspace(workspaceName, true);
  };
  const onFormSubmit = () => {
    props.state?.updateParent?.();
    close();
  };
  registerWorkspace({
    name: workspaceName,
    title: props.title,
    preferredWindowSize: <any>props.screenSize,
    load: getSyncLifecycle(OHRIForm, workspaceMeta),
  });

  launchPatientWorkspace(workspaceName, {
    ...props.state,
    mode: props.mode,
    encounterUuid: props.encounterUuid,
    onCancel: close,
    onSubmit: onFormSubmit,
  });
};

export const workspaceContext = new BehaviorSubject<WorkspaceContextProps | null>(null);
