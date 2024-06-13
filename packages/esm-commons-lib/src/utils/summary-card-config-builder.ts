import { getObsFromEncounter, getConditionalConceptValue } from './encounter-list-utils';

export const getSummaryCardProps = (schemaConfig) => {
  const columns = schemaConfig.columns?.map((column) => ({
    key: column.id,
    header: column.title,
    concept: column.concept,
    encounterTypes: column.encounterTypes,
    getObsValue: async ([encounter]) => {
      if (column.isConditionalConcept) {
        return getConditionalConceptValue(encounter, column.conditionalConceptMappings, column.isDate);
      }
      return getObsFromEncounter(
        encounter,
        column.concept,
        column.isDate,
        column.isTrueFalseConcept,
        column.type,
        column.fallbackConcepts,
      );
    },
    getObsSummary: async (encounters) => {
      const summaryValues = encounters.map((encounter) => {
        if (encounter && encounter.observation && encounter.observation.value) {
          return encounter.observation.value.join(', ');
        } else {
          return '';
        }
      });
      return summaryValues.join(' | ');
    },
  }));

  return columns;
};
