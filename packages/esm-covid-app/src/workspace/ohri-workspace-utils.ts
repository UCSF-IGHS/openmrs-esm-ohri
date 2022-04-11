import { getAsyncLifecycle } from '@openmrs/esm-framework';
import { BehaviorSubject } from 'rxjs';
import { SessionMode } from '../forms/types';
import { closeWorkspace, launchPatientWorkspace, registerWorkspace } from '@openmrs/esm-patient-common-lib';
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
  const workspaceName = props.workspaceName || 'ohri-forms-' + counter++;

  const close = () => {
    return closeWorkspace(workspaceName);
  };
  const onFormSubmit = () => {
    props.state?.updateParent?.();
    close();
  };
  registerWorkspace({
    name: workspaceName,
    title: props.title,
    preferredWindowSize: <any>props.screenSize,
    load: getAsyncLifecycle(() => import('./../forms/ohri-form.component'), workspaceMeta),
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