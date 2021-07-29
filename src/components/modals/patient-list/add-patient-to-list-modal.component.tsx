import { showToast, useCurrentPatient } from '@openmrs/esm-framework';
import { ListItem, Modal, RadioButton, RadioButtonGroup, SkeletonText, UnorderedList } from 'carbon-components-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { addPatientToCohort, evictCohortMembership, getCohorts, getPatientListsForPatient } from '../../../api/api';

const AddPatientToListOverflowMenuItem: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const [, patient] = useCurrentPatient(patientUuid);
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
          title={`Add ${patientDisplay} to list`}
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
  const [cohorts, setCohorts] = useState<Array<{ uuid: string; name: string }>>([]);
  const [alreadySubscribedCohorts, setAlreadySubscribedCohorts] = useState([]);
  const [currentMemberships, setCurrentMemberships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedList, setSelectedList] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getCohorts(cohortType), getPatientListsForPatient(patientUuid)]).then(
      ([allCohortsRes, currentCohortMemberships]) => {
        // filter out cohorts in which this patient is already a member
        const filteredCohorts = allCohortsRes.filter(
          cohort => !currentCohortMemberships.some(membership => cohort.uuid == membership.cohort.uuid),
        );
        setCohorts(filteredCohorts);
        setCurrentMemberships(currentCohortMemberships);
        setAlreadySubscribedCohorts(currentCohortMemberships.map(membership => membership.cohort));
        setIsLoading(false);
      },
    );
  }, [cohortType]);

  const availableLists = useMemo(() => {
    const controls = cohorts.map((cohort, index) => (
      <RadioButton labelText={cohort.name} value={cohort.uuid} id={cohort.uuid} key={index} />
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

  const alreadySubscribedLists = useMemo(() => {
    if (alreadySubscribedCohorts.length) {
      return (
        <UnorderedList style={{ marginLeft: '1rem', marginBottom: '1rem', color: '#c6c6c6' }}>
          {alreadySubscribedCohorts.map(cohort => (
            <ListItem>{cohort.name}</ListItem>
          ))}
        </UnorderedList>
      );
    }
    return (
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '.875rem', color: '#c6c6c6' }}>-- None --</span>
      </div>
    );
  }, [alreadySubscribedCohorts]);

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    if (selectedList == 'none') {
      // evict all the patient's memberships
      // according to our usecases, there is a high chance that the current memberships will always be one
      // but we can't be sure
      Promise.all(currentMemberships.map(membership => evictCohortMembership(membership.uuid)))
        .then(results => {
          showToast({
            kind: 'success',
            critical: true,
            description: `Patient was successfully removed from all lists`,
          });
          close();
        })
        .catch(error => {
          setIsSubmitting(false);
        });
    } else {
      addPatientToCohort(patientUuid, selectedList).then(response => {
        if (response.ok) {
          showToast({
            kind: 'success',
            critical: true,
            description: `Patient was successfully added to ${response.data.cohort.display}`,
          });
          close();
        } else {
          setIsSubmitting(false);
        }
      });
    }
  }, [selectedList, patientUuid, close, currentMemberships]);
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
              primaryButtonDisabled={
                isLoading ||
                selectedList == null ||
                isSubmitting ||
                (selectedList == 'none' && currentMemberships.length == 0)
              }>
              <div style={{ paddingLeft: '1rem', marginBottom: '2rem' }}>
                <p style={{ marginBottom: '1rem' }}>Currently added to the list(s) below</p>
                {isLoading ? loader : alreadySubscribedLists}
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
              </div>
            </Modal>,
            document.body,
          )}
    </>
  );
};

export default AddPatientToListOverflowMenuItem;
