import {
  attach,
  detach,
  detachAll,
  getAsyncLifecycle,
  registerExtension,
  showToast,
  useAssignedExtensionIds,
} from '@openmrs/esm-framework';
import { BehaviorSubject } from 'rxjs';
import { SessionMode } from '../forms/types';
import { OHRIWorkspaceSlot, workspaceInUse } from './ohri-workspace.component';

export interface WorkspaceContextProps {
  title: string;
  encounterUuid?: string;
  state?: any;
  mode?: SessionMode;
  screenSize?: string;
  collapseSections?: Boolean;
}

export const launchOHRIWorkSpace = (extension: string, props: WorkspaceContextProps) => {
  if (workspaceInUse) {
    showToast({
      kind: 'info',
      critical: true,
      description: `Workspace in use`,
    });
    return;
  }
  detachAll(OHRIWorkspaceSlot);
  registerExtension('ohri-workspace', {
    moduleName: '@openmrs/esm-ohri-app',
    load: getAsyncLifecycle(() => import('./ohri-workspace.component'), {
      featureName: 'ohri-workspace',
      moduleName: '@openmrs/esm-ohri-app',
    }),
    meta: {
      title: `${props?.mode === 'enter' ? 'Create New' : props.mode?.charAt(0).toUpperCase() + props.mode?.slice(1)} ${
        props?.title.split('Form')[0]
      }`,
      screenSize: props.screenSize,
      collapseSections: props.collapseSections,
    },
  });
  workspaceContext.next(props);
  attach('patient-chart-workspace-slot', 'ohri-workspace');
  attach(OHRIWorkspaceSlot, extension);
};

export const workspaceContext = new BehaviorSubject<WorkspaceContextProps | null>(null);
