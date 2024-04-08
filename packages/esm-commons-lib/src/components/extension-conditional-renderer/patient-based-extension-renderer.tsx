import React, { useEffect, useState } from 'react';
import { usePatient } from '@openmrs/esm-framework';
import { usePatientEncounters } from '../../hooks/usePatientEncounters';

// @ts-ignore
function calculateAge(dateString: string): number {
  const today = new Date();
  const birthDate = new Date(dateString);
  const monthDifference = today.getUTCMonth() - birthDate.getUTCMonth();
  const dateDifference = today.getUTCDate() - birthDate.getUTCDate();
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  if (monthDifference < 0 || (monthDifference === 0 && dateDifference < 0)) {
    age--;
  }
  return age;
}

export function PatientExtensionRenderer({ children, patientExpression }) {
  const { patient } = usePatient();
  const [shouldRender, setShouldRender] = useState(!patientExpression);
  const { encounterTypes, isLoading, error } = usePatientEncounters(patient?.id);

  useEffect(() => {
    if (patientExpression) {
      if (patient) {
        try {
          setShouldRender(eval(patientExpression));
        } catch (err) {
          console.error(err);
        }
      }
      if (encounterTypes) {
        try {
          setShouldRender(eval(patientExpression));
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [patient, patientExpression, encounterTypes]);

  return <>{shouldRender ? children : null}</>;
}

export default PatientExtensionRenderer;
