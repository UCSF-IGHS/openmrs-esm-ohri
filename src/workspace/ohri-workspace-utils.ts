import { attach, detach, detachAll, getAsyncLifecycle, registerExtension } from '@openmrs/esm-framework';
import { BehaviorSubject } from 'rxjs';
import { SessionMode } from '../forms/types';
import { OHRIWorkspaceSlot } from './ohri-workspace.component';

export interface WorkspaceContextProps {
  title: string;
  encounterUuid?: string;
  state?: any;
  mode?: SessionMode;
}

export const launchOHRIWorkSpace = (extension: string, props: WorkspaceContextProps) => {
  detachAll(OHRIWorkspaceSlot);
  registerExtension('ohri-workspace', {
    moduleName: '@openmrs/esm-ohri-app',
    load: getAsyncLifecycle(() => import('./ohri-workspace.component'), {
      featureName: 'ohri-workspace',
      moduleName: '@openmrs/esm-ohri-app',
    }),
    meta: {
      title: props.title,
    },
  });
  workspaceContext.next(props);
  attach('patient-chart-workspace-slot', 'ohri-workspace');
  attach(OHRIWorkspaceSlot, extension);
};

export const workspaceContext = new BehaviorSubject<WorkspaceContextProps | null>(null);
