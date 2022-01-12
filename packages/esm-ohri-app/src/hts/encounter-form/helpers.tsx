export const findObsByConceptValue = (obsList: any[], concept: any) =>
  obsList.find(obs => obs.value.uuid === concept.uuid);

export const filterObsByConceptQuestion = (obsList: any[], concept: any) =>
  obsList.filter(obs => obs.concept.uuid === concept.uuid);
