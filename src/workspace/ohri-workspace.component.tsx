import React, { useEffect, useState } from 'react';
import { ExtensionSlot, useAssignedExtensionIds } from '@openmrs/esm-framework';
import { workspaceContext, WorkspaceContextProps } from './ohri-workspace-utils';
import styles from './patient-list-workspace.scss';

export let workspaceInUse = false;

const OHRIWorkspace: React.FC<{
  closeWorkspace: () => {};
  patientUuid: string;
  viewMode: string;
  collapseSections: Boolean;
}> = ({ closeWorkspace, patientUuid, viewMode, collapseSections }) => {
  const currentExtensions = useAssignedExtensionIds('patient-chart-workspace-slot');

  useEffect(() => {
    if (currentExtensions.length == 0) {
      workspaceInUse = false;
    } else {
      workspaceInUse = true;
    }
    return () => {
      workspaceInUse = false;
    };
  }, [currentExtensions]);

  const [context, setContext] = useState<WorkspaceContextProps>(null);
  useEffect(() => {
    const sub = workspaceContext.subscribe(context => setContext(context));
    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      {context && (
        <ExtensionSlot
          className={styles.extensionContainer}
          extensionSlotName={OHRIWorkspaceSlot}
          state={{
            encounterUuid: context.encounterUuid,
            patient: patientUuid,
            closeWorkspace: closeWorkspace,
            formJson: context.state.formJson,
            state: context.state,
            mode: context.mode,
            viewMode: viewMode,
            collapseSections: collapseSections,
          }}
        />
      )}
    </>
  );
};

export default OHRIWorkspace;
export const OHRIWorkspaceSlot = 'ohri-workspace-slot';
