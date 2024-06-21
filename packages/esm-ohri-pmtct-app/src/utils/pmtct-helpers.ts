import { getIdentifierInfo } from '../api.resource';

export const generateInfantPTrackerId = (fieldId: string, motherPtrackerId: string): string | undefined => {
  if (!fieldId || !motherPtrackerId) return;
  return fieldId === 'infantPtrackerid'
    ? motherPtrackerId + '1'
    : fieldId.includes('_')
      ? motherPtrackerId.concat((Number(fieldId.split('_')[1]) + 1).toString())
      : undefined;
};

export const getIdentifierAssignee = (identifier: string, identifierType: string) => {
  return getIdentifierInfo(identifier).then((data) => {
    if (data) {
      for (const result of data.results) {
        for (const identifierObj of result.identifiers) {
          if (identifierObj.identifier === identifier && identifierObj.identifierType.uuid === identifierType) {
            return result.person;
          }
        }
      }
      return {};
    }
    return {};
  });
};
