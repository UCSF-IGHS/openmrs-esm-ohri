import React, { useCallback } from 'react';
import OHRIForm from '../../forms/ohri-form.component';

const OHRIFormView: React.FC<{ state: any; closeWorkspace: any; encounterUuid: string }> = ({
  state,
  closeWorkspace,
  encounterUuid,
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
    />
  );
};

export default OHRIFormView;
