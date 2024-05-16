import { BehaviorSubject } from 'rxjs';
import { closeWorkspace } from '@openmrs/esm-framework';
import { launchPatientWorkspace } from '@openmrs/esm-patient-common-lib';
import { type DefaultPatientWorkspaceProps } from '@openmrs/esm-patient-common-lib';
import { SessionMode } from '@openmrs/openmrs-form-engine-lib';
export interface WorkspaceContextProps  {
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



  launchPatientWorkspace(workspaceName, {
    ...props.state,
    mode: props.mode,
    encounterUuid: props.encounterUuid,
    onCancel: close,
    onSubmit: onFormSubmit,
    formSessionIntent: props.intent,
  });
};

export const workspaceContext = new BehaviorSubject<WorkspaceContextProps | null>(null);
