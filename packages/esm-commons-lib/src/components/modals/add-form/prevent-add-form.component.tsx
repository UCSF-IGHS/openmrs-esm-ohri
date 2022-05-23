import { usePatient } from '@openmrs/esm-framework';
import { Modal, SkeletonText } from 'carbon-components-react';
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
          title={`A Form for ${patientDisplay} Already exists`}
          continueFormLaunch={launchForm}
          launchFormJson={formJson}
        />
      )}
      <li className="bx--overflow-menu-options__option">
        <button
          className="bx--overflow-menu-options__btn"
          role="menuitem"
          onClick={() => setIsOpen(true)}
          style={{
            maxWidth: '100vw',
          }}>
          <span className="bx--overflow-menu-options__option-content">{displayText || 'Add '}</span>
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
  cohortType?: string;
  continueFormLaunch: (launchFormJson?: any, intent?: string) => void;
  launchFormJson?: any;
}> = ({ isOpen, close, title, continueFormLaunch, launchFormJson }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedList, setSelectedList] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(() => {
    const processedForm = applyFormIntent(launchFormJson.availableIntents[0], launchFormJson);
    continueFormLaunch(processedForm);
    close();
    // console.log(launchFormJson);
  }, [selectedList]);

  return (
    <>
      <Modal
        style={{ zIndex: 99999 }}
        open={isOpen}
        modalHeading={title || 'Encounter Form already Exists!'}
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
