import {
  getObsFromEncounter,
  getMultipleObsFromEncounter,
  resolveValueUsingMappings,
  getConceptFromMappings,
  getConditionalConceptValue,
} from './encounter-list-utils';
import { renderTag } from './encounter-list-component-util';
import { extractSchemaValues, replaceWithConfigDefaults } from './schema-manipulation';

interface ConfigSchema {
  [key: string]: { [key: string]: string | Array<string> };
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
  dependsOn?: string;
  dependantConcept?: string;
  dependantEncounter?: string;
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
  isConditionalConcept?: boolean;
  conditionalConceptMappings?: Record<string, string>;
  conditionalEncounterMappings?: Record<string, ConditionalEncounterMapping>;
}

export interface ConditionalEncounterMapping {
  concept: string;
  isDate?: boolean;
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
        const baseActions = column.actionOptions?.map((action: ActionProps) => ({
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

            const dependantEncounterValue = encounter.encounterType.uuid;

            if (dependantEncounterValue === action.dependantEncounter) {
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
      } else if (column.isConditionalConcept) {
        return getConditionalConceptValue(encounter, column.conditionalConceptMappings, column.isDate);
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

export const getMenuItemTabConfiguration = (schemaConfig: MenuProps, configSchema?: ConfigSchema) => {
  // gonna make the configSchema optional for now until we implement it everywher
  const configDefaults = extractSchemaValues(configSchema);

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
