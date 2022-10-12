import { getSyncLifecycle } from '@openmrs/esm-framework';
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
  // TODO: this should be a required property
  moduleName?: string;
}

let counter = 0;

export const launchOHRIWorkSpace = (props: WorkspaceContextProps) => {
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
    load: getSyncLifecycle(OHRIForm, {
      featureName: 'ohri-forms-workspace-item',
      // FIXME: This is a temporary solution, this is supposed to be a dynamic value
      // see: https://ohri.atlassian.net/browse/OHRI-1070
      moduleName: '@ohri/openmrs-esm-ohri-core-app', // props.moduleName,
    }),
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
