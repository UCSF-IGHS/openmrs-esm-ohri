import { Button, Modal, RadioButton, RadioButtonGroup } from 'carbon-components-react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Launcher: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ marginTop: '2rem' }}>
      {isOpen && <AddPatientToListModal isOpen={isOpen} close={() => setIsOpen(false)} />}
      <Button onClick={() => setIsOpen(true)}>Launch Modal</Button>
    </div>
  );
};

export const AddPatientToListModal: React.FC<{ isOpen: boolean; close: () => void }> = ({ isOpen, close }) => {
  return (
    <>
      {typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <Modal
              open={isOpen}
              modalHeading="Add Patient to list"
              modalLabel=""
              onRequestClose={close}
              passiveModal={false}
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel">
              <p style={{ marginBottom: '1rem' }}>Select the list where to add the client</p>
              <RadioButtonGroup
                legendText=""
                name="radio-button-group"
                defaultSelected="radio-1"
                orientation="vertical">
                <RadioButton labelText="Pre-test Couselling" value="radio-1" id="radio-1" />
                <RadioButton labelText="HIV test" value="radio-2" id="radio-2" />
                <RadioButton labelText="Post-test Couselling" value="radio-3" id="radio-3" />
                <RadioButton labelText="None" value="none" id="none" />
              </RadioButtonGroup>
            </Modal>,
            document.body,
          )}
    </>
  );
};

export default Launcher;
