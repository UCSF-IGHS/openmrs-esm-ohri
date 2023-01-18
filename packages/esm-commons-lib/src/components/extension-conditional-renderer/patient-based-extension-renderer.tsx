import React, { useEffect, useState, useMemo } from 'react';
import { usePatient } from '@openmrs/esm-framework';

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

  useEffect(() => {
    if (patient && !shouldRender) {
      try {
        setShouldRender(eval(patientExpression));
      } catch (err) {
        console.error(err);
      }
    }
  }, [patient]);

  return <>{shouldRender ? children : null}</>;
}

export default PatientExtensionRenderer;
