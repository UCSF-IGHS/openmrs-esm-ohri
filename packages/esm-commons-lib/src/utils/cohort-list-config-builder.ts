import { extractSchemaValues, replaceWithConfigDefaults } from './schema-manipulation';

export const getCohortListTabsData = (cohortTabsSchema, config) => {
  const configDefaults = extractSchemaValues(config);
  const transformedSchemaConfig = replaceWithConfigDefaults(cohortTabsSchema, configDefaults);

  const tabs = transformedSchemaConfig.tabDefinitions?.map((tab) => {
    return {
      name: tab.tabName,
      cohortListData: tab.cohortContent,
    };
  });

  return tabs;
};
