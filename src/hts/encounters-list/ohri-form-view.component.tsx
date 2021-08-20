import React, { useCallback } from 'react';
import OHRIForm from '../../forms/ohri-form.component';
import { SessionMode } from '../../forms/types';

const OHRIFormView: React.FC<{ state: any; closeWorkspace: any; encounterUuid?: string; mode?: SessionMode }> = ({
  state,
  closeWorkspace,
  encounterUuid,
  mode,
}) => {
  const onFormSubmit = useCallback(() => {
    if (state.updateParent) {
      state.updateParent();
    }
    closeWorkspace();
  }, []);
  return (
    <OHRIForm
      formJson={state.formJson}
      onCancel={closeWorkspace}
      onSubmit={onFormSubmit}
      encounterUuid={encounterUuid}
      mode={mode}
    />
  );
};

export default OHRIFormView;
