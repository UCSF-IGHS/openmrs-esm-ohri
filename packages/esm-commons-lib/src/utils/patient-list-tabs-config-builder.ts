import dayjs from 'dayjs';
import { findObs, getObsFromEncounter } from './encounter-list-utils';
import { extractSchemaValues, replaceWithConfigDefaults } from './schema-manipulation';

export const getPatientListTabsData = (patientListTabsSchema, config) => {
  const configDefaults = extractSchemaValues(config);
  const transformedSchemaConfig = replaceWithConfigDefaults(patientListTabsSchema, configDefaults);

  const tabs = transformedSchemaConfig.tabDefinitions?.map((tab) => {
    const otherColumnsData = tab.otherColumns.map((column) => {
      return {
        key: column.id,
        header: column.title,
        index: column.index || null,
        getValue: (row) => {
          const { encounter } = row;

          if (column.type === 'patientId') {
            return row.id;
          }

          if (column.type === 'lastDate') {
            return '13/01/2021';
          }

          if (column.type === 'appointmentDate') {
            return '03/03/2021';
          }

          if (column.type === 'encounterDate') {
            return encounter && dayjs(encounter.encounterDatetime).format('DD-MMM-YYYY');
          }

          if (column.type === 'vaccination') {
            const obs = findObs(encounter, column.concept);

            if (typeof obs !== 'undefined' && obs) {
              if (typeof obs.value === 'object') {
                const vaccineNAME =
                  obs.value.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
                  obs.value.name.name;
                if (vaccineNAME === 'Other non-coded') {
                  return getObsFromEncounter(encounter, column.fallbackConcepts[0]);
                }
              }
            }
            return getObsFromEncounter(encounter, column.concept);
          }

          return getObsFromEncounter(encounter, column.concept, column.isDate);
        },
      };
    });
    return {
      ...tab,
      label: tab.tabName,
      queryParams: tab.hasQueryParams ? [`value1=${new Date().toISOString().split('T')[0]}`] : null,
      otherColumns: otherColumnsData,
    };
  });

  return tabs;
};
