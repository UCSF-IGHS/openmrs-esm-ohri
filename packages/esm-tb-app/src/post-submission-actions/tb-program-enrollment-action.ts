import { getConfig, showToast, useConfig } from '@openmrs/esm-framework';
import { PostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';
import dayjs from 'dayjs';
import { createProgramEnrollment, getPatientEnrolledPrograms, updateProgramEnrollment } from '../api/api';

export const TBProgramEnrollmentSubmissionAction: PostSubmissionAction = {
  applyAction: async function ({ patient, encounters, sessionMode }) {
    const encounter = encounters[0];
    const encounterLocation = encounter.location['uuid'];
    // only do this in enter or edit mode.
    if (sessionMode === 'view') {
      return;
    }
    const enrollmentDate = encounter.obs?.find((item) => item.formFieldPath === 'ohri-forms-tbRegDate')?.value;
    const completionDate = encounter.obs?.find((item) => item.formFieldPath === 'ohri-forms-outcomeTBRx')?.value;
    const TBProgramUuid = await getTBProgram();

    const abortController = new AbortController();
    const payload = {
      patient: patient.id,
      program: TBProgramUuid, //TODO: change this to the TB program
      dateEnrolled: enrollmentDate ? dayjs(enrollmentDate).format() : null,
      dateCompleted: completionDate ? dayjs(completionDate).format() : null,
      location: encounterLocation,
    };

    if (sessionMode === 'enter') {
      createProgramEnrollment(payload, abortController).subscribe(
        (response) => {
          if (response.status === 201) {
            showToast({
              critical: true,
              kind: 'success',
              description: 'It is now visible in the Programs table',
              title: 'TB Program enrollment saved',
            });
          }
        },
        (err) => {
          showToast({
            title: 'Error saving program enrollment',
            kind: 'error',
            critical: false,
            description: err?.message,
          });
        },
      );
    } else {
      const patientEnrolledPrograms = await getPatientEnrolledPrograms(patient.id);
      let patientTBEnrollment = null;
      if (patientEnrolledPrograms) {
        patientTBEnrollment = patientEnrolledPrograms.results.find(
          (enrollment) => enrollment.program.uuid === TBProgramUuid && enrollment.dateCompleted === null,
        );
      }

      if (patientTBEnrollment) {
        updateProgramEnrollment(patientTBEnrollment.uuid, payload, abortController).subscribe(
          (response) => {
            if (response.status === 200) {
              showToast({
                critical: true,
                kind: 'success',
                description: 'Changes to the TB program are now visible in the Programs table',
                title: 'Program enrollment updated',
              });
            }
          },
          (err) => {
            showToast({
              title: 'Error saving TB program enrollment',
              kind: 'error',
              critical: false,
              description: err?.message,
            });
          },
        );
      }
    }
  },
};

async function getTBProgram() {
  const config = await getConfig('@ohri/openmrs-esm-ohri-tb-app');
  return config.programs.TBProgram;
}

export default TBProgramEnrollmentSubmissionAction;
