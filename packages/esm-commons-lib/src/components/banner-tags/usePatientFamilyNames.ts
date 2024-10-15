import { useState, useEffect, useCallback } from 'react';
import { fetchPatientRelationships } from '@ohri/openmrs-esm-ohri-commons-lib';

export const usePatientFamilyNames = (patientUuid: string) => {
  const [childrenNames, setChildrenNames] = useState<string[]>([]);
  const [motherName, setMotherName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [patientAge, setPatientAge] = useState<number | null>(null);
  const [patientGender, setPatientGender] = useState<string | null>(null);

  const fetchFamilyData = useCallback(async () => {
    try {
      // Fetch patient demographics (age and gender)
      const response = await fetch(`/openmrs/ws/rest/v1/patient/${patientUuid}?v=full`);
      const patient = await response.json();
      setPatientAge(patient.person.age);
      setPatientGender(patient.person.gender);

      // Fetch relationships
      const relationships = await fetchPatientRelationships(patientUuid);

      if (!relationships || !Array.isArray(relationships)) {
        console.warn('No valid relationships data:', relationships);
        setChildrenNames([]);
        setMotherName(null);
        setIsLoading(false);
        return;
      }

      const childRelationships = relationships
        .filter((relationship) => relationship.relationshipType?.displayBIsToA === 'Child')
        .map((relationship) => relationship.personB?.display);

      setChildrenNames(childRelationships);

      const motherRelationship = relationships.find(
        (relationship) =>
          relationship.relationshipType?.displayAIsToB === 'Mother' ||
          relationship.relationshipType?.displayBIsToA === 'Child',
      );

      setMotherName(motherRelationship?.personA?.display || 'Mother not found');

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching family names:', error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [patientUuid]);

  useEffect(() => {
    if (patientUuid) {
      fetchFamilyData();
    }
  }, [fetchFamilyData, patientUuid]);

  return { childrenNames, motherName, patientAge, patientGender, isLoading, isError };
};
