export const filterFHIRPatientsByName = (searchTerm: string, patients: Array<any>) => {
  return patients.filter(
    (patient) =>
      `${patient.name[0].given.join(' ')} ${patient.name[0].family}`.toLowerCase().search(searchTerm.toLowerCase()) !==
      -1,
  );
};
