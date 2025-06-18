import { BehaviorSubject } from 'rxjs';
import { closeWorkspace, launchWorkspace } from '@openmrs/esm-framework';
import type { SessionMode } from '@openmrs/esm-form-engine-lib';

export interface WorkspaceContextProps {
  title: string;
  encounterUuid?: string;
  state?: any;
  mode?: SessionMode;
  intent?: string;
  screenSize?: string;
  collapseSections?: Boolean;
  workspaceName?: string;
  moduleName: string;
}

let counter = 0;

export const launchOHRIWorkSpace = (props: WorkspaceContextProps) => {
  const workspaceName = props.workspaceName || 'ohri-forms-' + counter++;
  const close = () => {
    return closeWorkspace(workspaceName, { ignoreChanges: true });
  };

  const onFormSubmit = () => {
    props.state?.updateParent?.();
    close();
  };

  launchWorkspace(workspaceName, {
    ...props.state,
    mode: props.mode,
    encounterUuid: props.encounterUuid,
    onCancel: close,
    onSubmit: onFormSubmit,
    formSessionIntent: props.intent,
  });
};

export const workspaceContext = new BehaviorSubject<WorkspaceContextProps | null>(null);
