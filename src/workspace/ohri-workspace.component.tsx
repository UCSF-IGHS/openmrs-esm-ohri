import React, { useEffect, useState } from 'react';
import { ExtensionSlot } from '@openmrs/esm-framework';
import { workspaceContext, WorkspaceContextProps } from './ohri-workspace-utils';

const OHRIWorkspace: React.FC<{ closeWorkspace: () => {}; patientUuid: string }> = ({
  closeWorkspace,
  patientUuid,
}) => {
  const [context, setContext] = useState<WorkspaceContextProps>(null);

  useEffect(() => {
    const sub = workspaceContext.subscribe(context => setContext(context));
    return () => sub.unsubscribe();
  }, []);

  return (
    <div>
      {context && (
        <ExtensionSlot
          extensionSlotName={OHRIWorkspaceSlot}
          state={{
            encounterUuid: context.encounterUuid,
            patient: patientUuid,
            closeWorkspace: closeWorkspace,
            formJson: context.state.formJson,
            state: context.state,
            mode: context.mode,
          }}
        />
      )}
    </div>
  );
};

export default OHRIWorkspace;
export const OHRIWorkspaceSlot = 'ohri-workspace-slot';
