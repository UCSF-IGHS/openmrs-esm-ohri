import React, { useEffect, useState } from 'react';
import { usePatient } from '@openmrs/esm-framework';
import { getPatientEncounters } from '../../api/api';

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

function patientHasPreviousEncounter(patientUUID: string, encounterUUID: string): boolean {
  const [hasPreviousEncounter, setHasPreviousEncounter] = useState(false);
  useEffect(() => {
    (async () => {
      const previousEncounters = await getPatientEncounters(patientUUID, encounterUUID);
      if (previousEncounters.length) {
        setHasPreviousEncounter(true);
      }
    })();
  });
  console.log('HAS ENCOUNTER=======', hasPreviousEncounter);
  return hasPreviousEncounter;
}

export function PatientExtensionRenderer({ children, patientExpression }) {
  const { patient } = usePatient();
  const [shouldRender, setShouldRender] = useState(!patientExpression);

  useEffect(() => {
    if (patient && patientExpression) {
      try {
        setShouldRender(eval(patientExpression));
      } catch (err) {
        console.error(err);
      }
    }
  }, [patient, patientExpression]);

  return <>{shouldRender ? children : null}</>;
}

export default PatientExtensionRenderer;
