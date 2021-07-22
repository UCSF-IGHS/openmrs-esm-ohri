import { useCurrentPatient } from '@openmrs/esm-framework';
import { Modal, RadioButton, RadioButtonGroup, SkeletonText } from 'carbon-components-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { addPatientToCohort, getCohorts, getPatientListsForPatient } from '../../../api/api';

const AddPatientToListOverflowMenuItem: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [, patient] = useCurrentPatient(patientUuid);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <AddPatientToListModal
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          patientUuid={patientUuid}
          title={`Add ${patient.name[0].given.join(' ')} ${patient.name[0].family} to list`}
        />
      )}
      <li className="bx--overflow-menu-options__option">
        <button
          className="bx--overflow-menu-options__btn"
          role="menuitem"
          title="Add to list"
          data-floating-menu-primary-focus
          onClick={() => setIsOpen(true)}
          style={{
            maxWidth: '100vw',
          }}>
          <span className="bx--overflow-menu-options__option-content">Add to list</span>
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
}> = ({ isOpen, close, patientUuid, cohortType, title }) => {
  const [cohorts, setCohorts] = useState<Array<{ uuid: string; display: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    Promise.all([getCohorts(cohortType), getPatientListsForPatient(patientUuid)]).then(
      ([allCohortsRes, patientCohortsRes]) => {
        // filter out cohorts in which this patient is already a member
        // TODO: filter out voided cohorts nand memberships
        const filteredCohorts = allCohortsRes.data.results.filter(
          cohort => !patientCohortsRes.data.results.some(membership => cohort.uuid == membership.cohort.uuid),
        );
        setCohorts(filteredCohorts);
        setIsLoading(false);
      },
    );
  }, [cohortType]);

  const availableLists = useMemo(() => {
    const controls = cohorts.map(cohort => (
      <RadioButton labelText={cohort.display} value={cohort.uuid} id={cohort.uuid} />
    ));
    controls.push(<RadioButton labelText="None" value="none" id="none" />);
    return controls;
  }, [cohorts]);

  const loader = useMemo(() => {
    return (
      <>
        <SkeletonText width="60%" />
        <SkeletonText width="60%" />
      </>
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedList != 'none') {
      addPatientToCohort(patientUuid, selectedList).then(response => {
        if (response.ok) {
          close();
        }
      });
    }
  }, [selectedList, patientUuid, close]);
  return (
    <>
      {typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <Modal
              open={isOpen}
              modalHeading={title || 'Add Patient to list'}
              modalLabel=""
              onRequestClose={close}
              passiveModal={false}
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
              onRequestSubmit={handleSubmit}
              primaryButtonDisabled={selectedList == null}>
              <p style={{ marginBottom: '1rem' }}>Select the list where to add the client</p>

              {isLoading ? (
                loader
              ) : (
                <RadioButtonGroup
                  legendText=""
                  name="patient-lists"
                  orientation="vertical"
                  onChange={selected => setSelectedList(selected.toString())}>
                  {availableLists}
                </RadioButtonGroup>
              )}
            </Modal>,
            document.body,
          )}
    </>
  );
};

export default AddPatientToListOverflowMenuItem;
