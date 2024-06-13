import isEmpty from 'lodash-es/isEmpty';
import { fetchEtlData } from '../api/api';
import { getObsFromEncounter, getConditionalConceptValue } from './encounter-list-utils';
import { extractSchemaValues, replaceWithConfigDefaults } from './schema-manipulation';

export const getSummaryCardProps = (schemaConfig, config = null) => {
  const configDefaults = extractSchemaValues(config);
  const transformedSchemaConfig = replaceWithConfigDefaults(schemaConfig, configDefaults);
  const columns = transformedSchemaConfig.columns?.map((column) => ({
    key: column.id,
    header: column.title,
    concept: column.concept,
    encounterTypes: column.encounterTypes,
    getObsValue: async ([encounter]) => {
      if (column.isConditionalConcept) {
        return getConditionalConceptValue(encounter, column.conditionalConceptMappings, column.isDate);
      }

      if (column?.mambaEtlData === 'ancVisits') {
        const response = fetchEtlData('fetchMambaAncData', 'no_of_anc_visits', encounter?.patient?.uuid);
        return response?.data;
      }

      if (column?.mambaEtlData === 'motherStatus') {
        const response = fetchEtlData('fetchMambaAncData', 'mother_status', encounter?.patient?.uuid);
        return response?.data;
      }

      if (column?.mambaEtlData === 'deliveryDate') {
        const response = fetchEtlData('fetchMambaAncData', 'estimated_date_of_delivery', encounter?.patient?.uuid);
        return response?.data;
      }

      if (column?.mambaEtlData === 'motherHivStatus') {
        const response = fetchEtlData('fetchMambaAncData', 'mother_hiv_status', encounter?.patient?.uuid);
        return response?.data;
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
      if (column?.conditionalEncounterMappings && Object.keys(column?.conditionalEncounterMappings)?.length > 0 && column.encounterTypes?.length > 0) {
        const filteredEncounters = encounters.filter((encounter) =>
          column.encounterTypes.includes(encounter.encounterType.uuid),
        );
        let latestEncounter = null;
        let latestValue = null;

        filteredEncounters.forEach((encounter) => {
          if (encounter.obs && Array.isArray(encounter.obs)) {
            encounter.obs.forEach((observation) => {
              if (observation.concept.uuid === column.concept) {
                if (!latestEncounter || encounter.encounterDatetime > latestEncounter.encounterDatetime) {
                  latestEncounter = encounter;
                }
                latestValue = getObsFromEncounter(latestEncounter, column.concept, column.isDate);
              }
            });
          }
        });
        return latestValue;
      } else {
        const summaryValues = encounters.map((encounter) => {
          if (column.type === 'nextAppointmentDate') {
            let nextVisitDate = getObsFromEncounter(encounter[0], column.concept, true);
            if (nextVisitDate !== '--') {
              const days = calculateDateDifferenceInDate(nextVisitDate);
              nextVisitDate = nextVisitDate > 0 ? `In ${days}` : '';
            }
            return nextVisitDate;
          }
          if (encounter && encounter.observation && !isEmpty(encounter.observation.value)) {
            return encounter.observation.value.join(', ');
          } else {
            return '';
          }
        });
        return summaryValues?.length > 0 ? summaryValues.filter((val) => val !== '').join(' | ') : '';
      }
    },
  }));

  return columns;
};

export const calculateDateDifferenceInDate = (givenDate: string): string => {
  const dateDifference = new Date(givenDate).getTime() - new Date().getTime();
  const totalDays = Math.floor(dateDifference / (1000 * 3600 * 24));
  return `${totalDays} day(s)`;
};
