import {
  getObsFromEncounter,
  getMultipleObsFromEncounter,
  resolveValueUsingMappings,
  getConceptFromMappings,
} from './encounter-list-utils';
import { renderTag } from './encounter-list-component-util';

interface ConfigSchema {
  [key: string]: {
    _type: unknown;
    _description: string;
    _default: {
      [key: string]: string;
    };
  };
}

interface MenuProps {
  menuId: string;
  tabDefinitions: Array<TabSchema>;
}
interface ActionProps {
  mode: string;
  label: string;
  package: string;
  formName: string;
}

interface ConditionalActionProps {
  mode: string;
  label: string;
  package: string;
  formName: string;
  dependsOn: string;
  dependantConcept: string;
}

interface ColumnDefinition {
  id: string;
  title: string;
  isComplex?: boolean;
  concept?: string;
  secondaryConcept?: string;
  multipleConcepts?: Array<string>;
  fallbackConcepts?: Array<string>;
  actionOptions?: Array<ActionProps>;
  conditionalActionOptions?: Array<ConditionalActionProps>;
  isDate?: boolean;
  isTrueFalseConcept?: boolean;
  type?: string;
  isLink?: boolean;
  useMultipleObs?: boolean;
  valueMappings?: Record<string, string>;
  conceptMappings?: Array<string>;
  statusColorMappings?: Record<string, string>;
}

interface LaunchOptions {
  displayText: string;
  moduleName: string;
  hideFormLauncher?: boolean;
}
interface TabSchema {
  tabName: string;
  hasFilter?: boolean;
  headerTitle: string;
  displayText: string;
  encounterType: string;
  columns: Array<ColumnDefinition>;
  formList: Array<{ name: string; uuid: string; fixedIntent?: string; excludedIntents?: Array<string> }>;
  launchOptions: LaunchOptions;
}

interface FormattedColumn {
  key: string;
  header: string;
  getValue: (encounter: any) => string;
  link?: any;
  concept?: string;
}

export const getTabColumns = (columnsDefinition: Array<ColumnDefinition>) => {
  const columns: Array<FormattedColumn> = columnsDefinition.map((column: ColumnDefinition) => ({
    key: column.id,
    header: column.title,
    concept: column.concept,
    getValue: (encounter) => {
      if (column.id === 'actions') {
        const conditionalActions = [];
        const baseActions = column.actionOptions.map((action: ActionProps) => ({
          form: { name: action.formName, package: action.package },
          encounterUuid: encounter.uuid,
          intent: '*',
          label: action.label,
          mode: action.mode,
        }));

        if (column?.conditionalActionOptions?.length) {
          column?.conditionalActionOptions?.map((action) => {
            const dependantObsValue = getObsFromEncounter(encounter, action.dependantConcept);

            if (dependantObsValue === action.dependsOn) {
              return conditionalActions.push({
                form: { name: action.formName, package: action.package },
                encounterUuid: encounter.uuid,
                intent: '*',
                label: action.label,
                mode: action.mode,
              });
            }
          });
        }
        return [...baseActions, ...conditionalActions];
      } else if (column.statusColorMappings) {
        return renderTag(encounter, column.concept, column.statusColorMappings);
      } else if (column.useMultipleObs === true) {
        return getMultipleObsFromEncounter(encounter, column.multipleConcepts);
      } else if (column.valueMappings) {
        return resolveValueUsingMappings(encounter, column.concept, column.valueMappings);
      } else if (column.conceptMappings) {
        const concept = getConceptFromMappings(encounter, column.conceptMappings);
        return getObsFromEncounter(
          encounter,
          concept,
          column.isDate,
          column.isTrueFalseConcept,
          column.type,
          column.fallbackConcepts,
        );
      } else {
        return getObsFromEncounter(
          encounter,
          column.concept,
          column.isDate,
          column.isTrueFalseConcept,
          column.type,
          column.fallbackConcepts,
        );
      }
    },
    link: column.isLink
      ? {
          getUrl: (encounter) => encounter.url,
          handleNavigate: (encounter) => {
            encounter.launchFormActions?.viewEncounter();
          },
        }
      : null,
  }));

  return columns;
};

function extractDefaults(schema) {
  const result = {};

  function traverse(schema) {
    for (const key in schema) {
      if (key === '_default') {
        Object.assign(result, schema[key]);
      } else if (typeof schema[key] === 'object' && !Array.isArray(schema[key])) {
        traverse(schema[key]);
      }
    }
  }

  traverse(schema);
  return result;
}

function replaceWithConfigDefaults(obj, configDefaults) {
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (typeof item === 'string' && configDefaults.hasOwnProperty(item)) {
        return configDefaults[item];
      } else {
        return replaceWithConfigDefaults(item, configDefaults);
      }
    });
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      if (typeof obj[key] === 'string' && configDefaults.hasOwnProperty(obj[key])) {
        newObj[key] = configDefaults[obj[key]];
      } else {
        newObj[key] = replaceWithConfigDefaults(obj[key], configDefaults);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

export const getMenuItemTabConfiguration = (schemaConfig: MenuProps, configSchema?: ConfigSchema) => {
  // gonna make the configSchema optional for now until we implement it everywher
  const configDefaults = extractDefaults(configSchema);

  const transformedSchemaConfig = replaceWithConfigDefaults(schemaConfig, configDefaults);

  const tabs = (configSchema ? transformedSchemaConfig.tabDefinitions : schemaConfig.tabDefinitions).map((tab) => {
    return {
      name: tab.tabName,
      hasFilter: tab.hasFilter || false,
      encounterType: tab.encounterType,
      headerTitle: tab.headerTitle,
      description: tab.displayText,
      formList: tab.formList,
      columns: getTabColumns(tab.columns),
      launchOptions: tab.launchOptions,
    };
  });

  return tabs;
};
