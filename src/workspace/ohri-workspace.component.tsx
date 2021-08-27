import React, { useEffect, useState } from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { workspaceContext, WorkspaceContextProps } from './ohri-workspace-utils';
import styles from './patient-list-workspace.scss';

const OHRIWorkspace: React.FC<{ closeWorkspace: () => {}; patientUuid: string; viewMode: string }> = ({
  closeWorkspace,
  patientUuid,
  viewMode,
}) => {
  const [context, setContext] = useState<WorkspaceContextProps>(null);
  useEffect(() => {
    const sub = workspaceContext.subscribe(context => setContext(context));
    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      {context && (
        <ExtensionSlot
          className={styles.Extentioncontainer}
          extensionSlotName={OHRIWorkspaceSlot}
          state={{
            encounterUuid: context.encounterUuid,
            patient: patientUuid,
            closeWorkspace: closeWorkspace,
            formJson: context.state.formJson,
            state: context.state,
            mode: context.mode,
            viewMode: viewMode,
          }}
        />
      )}
    </>
  );
};

export default OHRIWorkspace;
export const OHRIWorkspaceSlot = 'ohri-workspace-slot';
