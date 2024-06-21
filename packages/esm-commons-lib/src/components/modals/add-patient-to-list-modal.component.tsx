import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { showToast, usePatient } from '@openmrs/esm-framework';
import { ListItem, Modal, RadioButton, RadioButtonGroup, SkeletonText, UnorderedList } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { addPatientToCohort, evictCohortMembership, getCohorts, getPatientListsForPatient } from '../../api.resource';

export const AddPatientToListOverflowMenuItem: React.FC<{
  patientUuid: string;
  displayText?: string;
  excludeCohorts?: Array<string>;
}> = ({ patientUuid, displayText, excludeCohorts }) => {
  const { patient } = usePatient(patientUuid);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
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
          excludeCohorts={excludeCohorts}
        />
      )}
      <li className="cds--overflow-menu-options__option">
        <button
          className="cds--overflow-menu-options__btn"
          role="menuitem"
          title={t('startHTSSession', 'Start HTS Session')}
          onClick={() => setIsOpen(true)}
          style={{
            maxWidth: '100vw',
          }}
        >
          <span className="cds--overflow-menu-options__option-content">
            {displayText || t('startHTSSession', 'Start HTS Session')}
          </span>
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
  excludeCohorts?: Array<string>;
}> = ({ isOpen, close, patientUuid, cohortType, title, excludeCohorts }) => {
  const [cohorts, setCohorts] = useState<Array<{ uuid: string; name: string }>>([]);
  const [alreadySubscribedCohorts, setAlreadySubscribedCohorts] = useState([]);
  const [currentMemberships, setCurrentMemberships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedList, setSelectedList] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    Promise.all([getCohorts(cohortType), getPatientListsForPatient(patientUuid)]).then(
      ([allCohortsRes, currentCohortMemberships]) => {
        // filter out cohorts in which this patient is already a member
        let filteredCohorts = allCohortsRes.filter(
          (cohort) => !currentCohortMemberships.some((membership) => cohort.uuid == membership.cohort.uuid),
        );
        if (excludeCohorts && excludeCohorts.length) {
          filteredCohorts = filteredCohorts.filter((cohort) => !excludeCohorts.includes(cohort.name));
        }
        setCohorts(filteredCohorts);
        setCurrentMemberships(currentCohortMemberships);
        setAlreadySubscribedCohorts(currentCohortMemberships.map((membership) => membership.cohort));
        setIsLoading(false);
      },
    );
  }, [cohortType, excludeCohorts, patientUuid]);

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
          {alreadySubscribedCohorts.map((cohort, index) => (
            <ListItem key={index}>{cohort.name}</ListItem>
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
      Promise.all(currentMemberships.map((membership) => evictCohortMembership(membership.uuid)))
        .then((results) => {
          showToast({
            kind: 'success',
            critical: true,
            description: t('patientAddedSuccess', `Patient was successfully removed from all lists`),
          });
          close();
        })
        .catch((error) => {
          setIsSubmitting(false);
        });
    } else {
      addPatientToCohort(patientUuid, selectedList).then((response) => {
        if (response.ok) {
          showToast({
            kind: 'success',
            critical: true,
            description: t(
              'patientAddedToCohortSuccess',
              `Patient was successfully added to ${response.data.cohort.display}`,
            ),
          });
          close();
        } else {
          setIsSubmitting(false);
        }
      });
    }
  }, [selectedList, currentMemberships, t, close, patientUuid]);
  return (
    <>
      <Modal
        style={{ zIndex: 99999 }}
        open={isOpen}
        modalHeading={title || t('addPatientToListOption', 'Add Patient to list')}
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
        }
      >
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
              onChange={(selected) => setSelectedList(selected.toString())}
            >
              {availableLists}
            </RadioButtonGroup>
          )}
        </div>
      </Modal>
    </>
  );
};
