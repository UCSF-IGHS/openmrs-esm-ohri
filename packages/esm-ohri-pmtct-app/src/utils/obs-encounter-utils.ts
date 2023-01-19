export function findObsByConcept(encounter: any, concept: string): Array<any> {
  return encounter?.obs?.filter((observation) => observation.concept.uuid === concept) || [];
}

export function findChildObsInTree(parent: any, childConcept: string) {
  return parent.groupMembers?.find((obs) => obs.concept.uuid == childConcept);
}

export function getObsValueCoded(obs) {
  return obs?.value?.uuid;
}
