import { getObsFromEncounter } from './encounter-list-utils';
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
          if (column.type === 'patientId') {
            return row.id;
          }

          if (column.type === 'lastDate') {
            return '13/01/2021';
          }

          if (column.type === 'appointmentDate') {
            return '03/03/2021';
          }

          const { encounter } = row;
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
