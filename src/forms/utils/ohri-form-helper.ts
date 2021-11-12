import { ConceptFalse, ConceptTrue } from '../constants';
import { OHRIFormField, OHRIFormSection } from '../types';

export function cascadeVisibityToChildFields(
  visibility: boolean,
  section: OHRIFormSection,
  allFields: Array<OHRIFormField>,
) {
  const candidateIds = section.questions.map(q => q.id);
  allFields
    .filter(field => candidateIds.includes(field.id))
    .forEach(field => {
      field.isParentHidden = visibility;
    });
}
