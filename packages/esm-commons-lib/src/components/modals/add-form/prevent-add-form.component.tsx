import { usePatient } from '@openmrs/esm-framework';
import { Modal, RadioButton, SkeletonText } from 'carbon-components-react';
import { applyFormIntent } from 'openmrs-ohri-form-engine-lib';
import React, { useCallback, useMemo, useState } from 'react';

export const AddPatientToListOverflowMenuItem: React.FC<{
  patientUuid: string;
  displayText?: string;
  launchForm: (formJson?: any, intent?: string) => void;
  formJson?: Array<any>;
}> = ({ patientUuid, displayText, launchForm, formJson }) => {
  const { patient } = usePatient(patientUuid);
  const [isOpen, setIsOpen] = useState(false);
  const patientDisplay = useMemo(() => {
    return patient ? `${patient.name[0].given.join(' ')} ${patient.name[0].family}` : 'Patient';
  }, [patient]);

  return (
    <>
      {isOpen && (
        <AddPatientToListModal
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          patientUuid={patientUuid}
          title={`An Encounter for ${patientDisplay} Already exists`}
          launchForm1={launchForm}
          formJson1={formJson}
        />
      )}
      <li className="bx--overflow-menu-options__option">
        <button
          className="bx--overflow-menu-options__btn"
          role="menuitem"
          title="Add +"
          onClick={() => setIsOpen(true)}
          style={{
            maxWidth: '100vw',
          }}>
          <span className="bx--overflow-menu-options__option-content">{displayText || 'Add +'}</span>
        </button>
      </li>
    </>
  );
};

export const AddPatientToListModal: React.FC<{
  isOpen: boolean;
  close: () => void;
  patientUuid: string;
  title?: string;
  launchForm1: (formJson1?: any, intent?: string) => void;
  formJson1?: any;
}> = ({ isOpen, close, title, launchForm1, formJson1 }) => {
  const handleSubmit = useCallback(() => {
    const processedForm = applyFormIntent(formJson1.availableIntents[0], formJson1);
    launchForm1(processedForm);
    close();
  }, [close, formJson1, launchForm1]);

  return (
    <>
      <Modal
        open={isOpen}
        modalHeading={title || 'Form Already Exists'}
        modalLabel=""
        onRequestClose={close}
        passiveModal={false}
        primaryButtonText="Continue"
        secondaryButtonText="Cancel"
        onRequestSubmit={handleSubmit}>
        <div style={{ paddingLeft: '1rem', marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>
            There is another form that exists in the system for this encounter, do you still want to create another one?
          </p>
        </div>
      </Modal>
    </>
  );
};
